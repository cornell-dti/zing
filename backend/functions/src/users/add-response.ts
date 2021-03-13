import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreSurveyDoc, FirestoreCourseDoc } from "../firestore-types";
import { db } from "../db";

const idInCourseList = (
	id: string,
	docSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): boolean => {
	const { studentList } = docSnapshot.data() as FirestoreCourseDoc;
	return studentList.includes(id);
};

const addResponse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
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
			const survey: FirestoreSurveyDoc = {
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
			const courseRef = db.collection("courses").doc(courseId);
			await courseRef.get().then((docSnapshot) => {
				if (
					docSnapshot.exists &&
					idInCourseList(studentId, docSnapshot)
				) {
					courseRef.onSnapshot((doc) => {
						doc.ref.update({
							completed: admin.firestore.FieldValue.arrayUnion(
								studentId
							),
						});
						doc.ref.collection("surveys").add(survey);
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

export default addResponse;
