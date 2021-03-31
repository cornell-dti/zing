import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { db, storage } from "../db";
import { parseAsync } from "json2csv";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const fields = [
	"fullName",
	"studentId",
	"identity",
	"pronoun",
	"graduation",
	"college",
	"remote",
	"mode",
	"time",
	"start",
];

const createSurveyCsv = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		try {
			const { courseId } = request.body;
			const surveySnapshot = await db
				.collection("courses")
				.doc(courseId)
				.collection("surveys")
				.get();

			// prettier-ignore
			const surveyDocs = surveySnapshot.docs.map(
				(doc: DocumentSnapshot) => doc.data()
			);

			const outputCsv = await parseAsync(surveyDocs, { fields });
			const filename = `${courseId}.csv`;
			const tempFile = path.join(os.tmpdir(), filename);

			return new Promise<void>((resolve, reject) => {
				fs.writeFile(tempFile, outputCsv, (error) => {
					if (error) {
						reject(error);
						return;
					}
					const bucket = storage.bucket();

					bucket
						.upload(tempFile, {
							metadata: {
								metadata: {
									firebaseStorageDownloadTokens: uuidv4(),
								},
							},
						})
						.then(() => {
							response.status(200).send(
								`Successfully converted responses\
									 for ${courseId} to a CSV file.`
							);
							resolve();
						})
						.catch((error) => {
							console.log(error);
							response.status(500).send(error);
							reject(error);
						});
				});
			});
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	}
);

export default createSurveyCsv;
