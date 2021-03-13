import * as functions from "firebase-functions";
import { FirestoreCourseDoc } from "../firestore-types";
import { db } from "../db";

const createCourse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		try {
			const { courseId, courseName, studentList } = request.body;
			const course: FirestoreCourseDoc = {
				courseName,
				studentList,
				completed: [],
			};
			await db
				.collection("courses")
				.doc(courseId)
				.set(course, { merge: true });
			response
				.status(200)
				.send(`Successfully created a document for ${courseName}.`);
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	}
);

export default createCourse;
