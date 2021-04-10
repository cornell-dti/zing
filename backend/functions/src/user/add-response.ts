import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreSurveyDoc } from "../firestore-types";
import { idInCourseList } from "../utils";
import { db } from "../db";

const addResponse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Headers", "Content-Type");
		if (request.method != "POST") {
			response.status(403).send("Forbidden");
		}
		addOrUpdateSurvey(request, response);
	}
);

const addOrUpdateSurvey = async (
	request: functions.https.Request,
	response: functions.Response<any>
) => {
	try {
		const {
			courseId,
			fullName,
			studentId,
			identity,
			pronoun,
			graduation,
			college,
			remote,
			mode,
			time,
			start,
		} = request.body;
		const surveyDoc: FirestoreSurveyDoc = {
			fullName,
			studentId,
			identity,
			pronoun,
			graduation,
			college,
			remote,
			mode,
			time,
			start,
		};
		const courseRef = db.collection("course").doc(courseId);
		await courseRef.get().then((docSnapshot) => {
			if (docSnapshot.exists && idInCourseList(studentId, docSnapshot)) {
				courseRef.onSnapshot((doc) => {
					const surveyColRef = doc.ref.collection("survey");
					surveyColRef
						.where("studentId", "==", studentId)
						.limit(1)
						.get()
						.then((snapshot) => {
							let docExists = false;
							if (!snapshot.empty) {
								docExists = true;
								snapshot.forEach((doc) => {
									doc.ref.update(surveyDoc);
								});
							}
							return docExists;
						})
						.then((docExists) => {
							if (!docExists) {
								doc.ref.update({
									completed: admin.firestore.FieldValue.arrayUnion(studentId),
								});
								doc.ref.collection("survey").add(surveyDoc);
							}
						});
				});
				response
					.status(200)
					.send(`Successfully submitted your response for ${courseId}.`);
			} else {
				response.status(500).send("Something went wrong!");
			}
		});
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
};

export default addResponse;
