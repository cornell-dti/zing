import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreCourseDoc } from "../firestore-types";
import { db } from "../db";

const createCourse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.set("Access-Control-Allow-Origin", "*");
		if (request.method === "OPTIONS") {
			// Send response to OPTIONS requests
			response.set("Access-Control-Allow-Methods", "POST");
			response.set("Access-Control-Allow-Headers", "Content-Type");
			response.status(204).send("");
		} else {
			try {
				const { courseId, studentList, userEmail } = request.body;
				const getUserRef = db
					.collection("userdata")
					.where("email", "==", userEmail)
					.limit(1)
					.get()
					.then((snapshot) => {
						if (snapshot.empty) return null;
						else {
							const docRef = snapshot.docs[0].ref;
							docRef.update({
								course: admin.firestore.FieldValue.arrayUnion(courseId),
							});
							return docRef;
						}
					});

				getUserRef.then((user) => {
					if (user === null) {
						response.status(409).send("Specified user email does not exist!");
						return;
					}
					const course: FirestoreCourseDoc = {
						studentList,
						completed: [],
						creator: user,
					};
					const groupDocRef = db.collection("course").doc(courseId);
					let docExists = false;
					// prettier-ignore
					groupDocRef
						.get()
						.then((snapshot) => {
							if (snapshot.exists) {
								response.status(409).send("Specified groupId already exists!");
								docExists = true;
								return;
							}
							snapshot.ref.set(course, { merge: true });
						});
					if (docExists) return;
					response
						.status(200)
						.send(`Successfully created a document for ${courseId}.`);
				});
			} catch (error) {
				console.log(error);
				response.status(500).send(error);
			}
		}
	}
);

export default createCourse;
