import google.cloud.logging
from google.cloud import storage, firestore
from src import controller

CLASS_BUCKET = "zing-backend.appspot.com"


def create_groups(request):
    try:
        request_json = request.get_json()
        if request.args and "className" in request.args:
            class_name = request.args.get("className")
        elif request_json and "className" in request_json:
            class_name = request_json["className"]
        else:
            return "Parameter className is not specified", 404

        storage_client = storage.Client()
        logging_client = google.cloud.logging.Client()
        logging_client.get_default_handler()
        logging_client.setup_logging()

        student_file_name = class_name + ".csv"
        source_bucket = storage_client.bucket(CLASS_BUCKET)
        source_blob = source_bucket.blob(student_file_name)
        source_file = f"/tmp/{student_file_name}"
        source_blob.download_to_filename(source_file)

        db = firestore.Client()
        course_doc = db.collection("course").document(class_name).get()
        if not course_doc.exists:
            return "Given className does not exist", 404
        data = course_doc.to_dict()
        creatorEmail, config, minGroupSize = \
            data["creator"], data["config"], data["minGroupSize"]
        creator_query_result = db.collection("userdata") \
            .where("email", "==", creatorEmail) \
            .stream()
        for doc in creator_query_result:
            print(f"config name: {config}")
            config_doc = doc.reference.collection("config") \
                .document(config) \
                .get()

        if not config_doc.exists:
            return "The config assigned for the class does not exist", 404
        config_data = config_doc.to_dict()
        config_data["group_size"] = str(minGroupSize) + "+"

        status = controller.run(config_data, source_file, class_name)
        if not status:
            print('Could not completely meet all rules')

        # Cleanup: Remove survey documents
        survey_docs = db.collection("course") \
            .document(class_name).collection("survey").stream()

        for doc in survey_docs:
            doc.reference.delete()

        # file_name = '{0}_{1}'.format(class_name, "groups.csv")
        # file_dir = os.path.join(tempfile.gettempdir(), file_name)
        # destination_blob.upload_from_filename(file_dir)
        return 'Group generation complete', 200

    except Exception as e:
        print(e)
        return e, 500
