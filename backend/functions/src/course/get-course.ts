import * as functions from "firebase-functions";
import { FirestoreCourseDoc } from "../firestore-types";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { db } from "../db";

const zingDocToObject = (doc: DocumentSnapshot) => {
	const data = doc.data() as FirestoreCourseDoc;
	return { ...data, dueDate: data.dueDate.toDate() };
};

const getCourse = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.set("Access-Control-Allow-Origin", "*");
		if (request.method === "OPTIONS") {
			// Send response to OPTIONS requests
			response.set("Access-Control-Allow-Methods", "POST");
			response.set("Access-Control-Allow-Headers", "Content-Type");
			response.status(204).send("");
		} else {
			getCourseByUserEmail(request, response);
		}
	}
);

const getCourseByUserEmail = async (
	request: functions.https.Request,
	response: functions.Response<any>
) => {
	try {
		const { userEmail } = request.query;
		db.collection("course")
			.where("creator", "==", userEmail)
			.get()
			.then((userSnapshot) => {
				if (userSnapshot.empty) {
					return response
						.status(404)
						.send("No course listed under given email");
				}
				const objs = userSnapshot.docs.map(zingDocToObject);
				return response.status(200).send(objs);
			});
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
};

export default getCourse;
