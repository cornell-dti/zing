import logging
import sys
from google.cloud import firestore
from src import controller
from operator import itemgetter


def create_groups(request):
    # Setup logging
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
    logger = logging.getLogger(__name__)

    # Retrieve class name (classId) from request
    if not request.args or "className" not in request.args:
        error_message = "Parameter className is not specified"
        logger.error(error_message)
        return error_message, 400
    class_name = request.args.get("className")

    # Retrieve course document from Firestore
    db = firestore.Client()
    course_doc = db.collection("course").document(class_name).get()

    if not course_doc.exists:
        error_message = "Given className does not exist"
        logger.error(error_message)
        return error_message, 404
    data = course_doc.to_dict()
    email, config, minGroupSize = itemgetter("creator", "config",
                                             "minGroupSize")(data)

    # Retrieve specified config from Firestore user document
    creator_query_result = db.collection("userdata").where(
        "email", "==", email).stream()
    doc = next(creator_query_result)
    logger.info("Running with config: %s under user: %s", config, email)
    config_doc = doc.reference.collection("config").document(config).get()

    if not config_doc.exists:
        error_message = "The config assigned for the class does not exist"
        logger.error("%s", error_message)
        return error_message, 404

    config_data = config_doc.to_dict()
    config_data["group_size"] = str(minGroupSize) + "+"

    # Run GroupEng with provided configuration and class name
    status = controller.run(config_data, class_name)
    if not status:
        logger.warning('Could not completely meet all rules')

    # Cleanup: Remove survey documents
    survey_docs = db.collection("course").document(class_name).collection(
        "survey").stream()

    for doc in survey_docs:
        doc.reference.delete()

    return 'Group generation complete', 200
