/* eslint-disable max-len */

import * as functions from "firebase-functions";
import * as csv from "csv-parser";
import * as fs from "fs";
import { FirestoreSurveyDoc } from "../firestore-types";
import { db } from "../db";

const batchWrite = (
	data: FirestoreSurveyDoc[],
	surveysRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
) => {
	data.forEach((doc) => {
		surveysRef.add(doc);
	});
};

const seedSurveyData = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		try {
			const { courseId } = request.body;
			console.log(courseId);
			const courseRef = db.collection("courses").doc(courseId);
			await courseRef.get().then((docSnapshot) => {
				if (docSnapshot.exists) {
					courseRef.onSnapshot((doc) => {
						const batch = db.batch();
						const surveysRef = doc.ref.collection("surveys");
						const results: FirestoreSurveyDoc[] = [];
						fs.createReadStream("../mock_survey.csv")
							.pipe(csv())
							.on("data", (data) => results.push(data))
							.on("end", () => {
								console.log(`result: ${results[0]}`);
								batchWrite(results, surveysRef);
							});
						batch.commit();
					});
					response
						.status(200)
						.send(`Successfully seeded data for ${courseId}.`);
				} else {
					throw new TypeError(`Course ${courseId} is nonexistent.`);
				}
			});
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	}
);

export default seedSurveyData;
