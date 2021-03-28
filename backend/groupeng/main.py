import os
import logging
import tempfile
import google.cloud.logging
from google.cloud import storage
from src import controller


def create_groups(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    storage_client = storage.Client()
    logging_client = google.cloud.logging.Client()
    logging_client.get_default_handler()
    logging_client.setup_logging()

    file_name = event['name']
    class_name = os.path.splitext(file_name)[0]
    source_bucket = storage_client.bucket(event['bucket'])
    source_blob = source_bucket.blob(file_name)
    config_blob = source_bucket.blob('default_specification.groupeng')
    destination_bucket = storage_client.bucket('zing-results')
    destination_blob = destination_bucket.blob(f"{class_name}_groups.csv")

    source_file = f"/tmp/{file_name}"
    config_file = f"/tmp/default_specification.groupeng"
    source_blob.download_to_filename(source_file)
    config_blob.download_to_filename(config_file)

    try:
        print(f"Running Groupeng on bucket {event['bucket']}")
        status = controller.run(config_file, source_file)
        if not status:
            print('Could not completely meet all rules')
        file_name = '{0}_{1}'.format(class_name, "groups.csv")
        file_dir = os.path.join(tempfile.gettempdir(), file_name)
        destination_blob.upload_from_filename(file_dir)
        print('Group generation complete')
    except Exception as e:
        print(e)
