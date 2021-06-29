from google.cloud import logging, storage, firestore
from src import controller
import base64

CLASS_BUCKET = "zing-backend.appspot.com"


def subscribe(event, context):
    try:
        class_doc_id = base64.b64decode(event["data"])
        storage_client = storage.Client()
        logging_client = logging.Client()
        logging_client.get_default_handler()
        logging_client.setup_logging()

        student_file_name = class_doc_id + ".csv"
        source_bucket = storage_client.bucket(CLASS_BUCKET)
        source_blob = source_bucket.blob(student_file_name)
        source_file = f"/tmp/{student_file_name}"
        source_blob.download_to_filename(source_file)

        db = firestore.Client()
        course_doc = db.collection("course").document(class_doc_id).get()
        if not course_doc.exists:
            print("Given course document id does not exist!")
            return
        data = course_doc.to_dict()
        course_name = data["name"]
        email = data["creator"]
        config = data["config"]
        group_size = str(data["minGroupSize"]) + "+"
        creator_query_result = db.collection("userdata") \
            .where("email", "==", email) \
            .stream()
        for doc in creator_query_result:
            print(f"config name: {config}")
            config_doc = doc.reference.collection("config") \
                .document(config) \
                .get()

        if not config_doc.exists:
            print("The config assigned for the class does not exist")
            return
        config_data = config_doc.to_dict()
        config_data["groupSize"] = group_size
        status = controller.run(config_data, source_file, class_doc_id)
        if not status:
            print('Could not completely meet all rules')
            return
        print(f"Generated grouping for {course_name}")
    except Exception as e:
        print(e)
