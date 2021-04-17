import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreSurveyDoc } from "../firestore-types";
import { idInCourseList } from "../utils";
import { db } from "../db";

const addInstructor = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Content-Type", "application/json");
		response.header("Access-Control-Allow-Headers", "Content-Type");

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
						doc.ref.update({
							completed: admin.firestore.FieldValue.arrayUnion(studentId),
						});
						doc.ref.collection("survey").add(surveyDoc);
					});
				} else {
					throw new TypeError(`Course ${courseId} is nonexistent.`);
				}
			});
			response
				.status(200)
				.send(`Successfully submitted your response for ${courseId}.`);
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	}
);

export default addInstructor;
