import * as functions from "firebase-functions";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { db, storage } from "./db";
import { parseAsync } from "json2csv";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

type Data = {
	surveyDocId: string;
};

const createSurveyCsv = async (
	data: Data,
	context: functions.https.CallableContext
): Promise<void> => {
	const surveySnapshot = await db
		.collection("surveys")
		.doc(data.surveyDocId)
		.collection("survey_responses")
		.get();

	const surveyDocs = surveySnapshot.docs.map((doc: DocumentSnapshot) =>
		doc.data()
	);

	const fields = [
		"id",
		"gpa",
		"gender",
		"ethnicity",
		"major",
		"skill1",
		"skill2",
		"skill3",
		"project_choice",
	];

	const outputCsv = await parseAsync(surveyDocs, { fields });

	const filename = `class_.csv`;
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
				.then(() => resolve())
				.catch((error) => reject(error));
		});
	});
};

export default createSurveyCsv;
