import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreCourseDoc, FirestoreUserDoc } from "../../firestore-types";
import { Timestamp } from "@google-cloud/firestore";
import { db } from "../../db";

const addCourse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.set("Access-Control-Allow-Origin", "*");
		if (request.method === "OPTIONS") {
			// Send response to OPTIONS requests
			response.set("Access-Control-Allow-Methods", "POST");
			response.set("Access-Control-Allow-Headers", "Content-Type");
			response.status(204).send("");
		} else {
			createCourse(request, response);
		}
	}
);

const createCourse = async (
	request: functions.https.Request,
	response: functions.Response<any>
) => {
	try {
		const { name, minGroupSize, dueDate, userEmail } = request.body;
		db.collection("userdata")
			.where("email", "==", userEmail)
			.limit(1)
			.get()
			.then((userSnapshot) => {
				if (userSnapshot === null) {
					throw new Error("Specified user email does not exist!");
				}
				return userSnapshot.docs[0].ref.get();
			})
			.then((userDoc) => {
				const { email } = userDoc.data() as FirestoreUserDoc;
				const course: FirestoreCourseDoc = {
					name,
					minGroupSize,
					dueDate: Timestamp.fromDate(new Date(dueDate)),
					creator: email,
					completed: [],
				};
				const courseRef = db.collection("course");
				courseRef
					.where("name", "==", name)
					.limit(1)
					.get()
					.then((snapshot) => {
						if (!snapshot.empty) {
							throw new Error("Specified groupID already exists!");
						}
						courseRef.add(course).then((doc) => {
							userDoc.ref.update({
								course: admin.firestore.FieldValue.arrayUnion(doc.id),
							});
							response.status(200).send(doc.id);
						});
					});
			});
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
};

export default addCourse;
