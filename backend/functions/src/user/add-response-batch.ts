/* eslint-disable max-len */

import * as functions from "firebase-functions";
import * as csv from "csv-parser";
import * as fs from "fs";
import { FirestoreSurveyDoc } from "../firestore-types";
import { db } from "../db";

const batchWrite = (
	data: FirestoreSurveyDoc[],
	surveyCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
) => {
	data.forEach((doc) => {
		surveyCollectionRef.add(doc);
	});
};

const seedSurveyData = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		try {
			const { courseId } = request.body;
			const courseRef = db.collection("course").doc(courseId);
			await courseRef.get().then((docSnapshot) => {
				if (docSnapshot.exists) {
					courseRef.onSnapshot((doc) => {
						const batch = db.batch();
						const surveyCollectionRef = doc.ref.collection("survey");
						const results: FirestoreSurveyDoc[] = [];
						fs.createReadStream("../mock_survey.csv")
							.pipe(csv())
							.on("data", (data) => results.push(data))
							.on("end", () => {
								batchWrite(results, surveyCollectionRef);
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
