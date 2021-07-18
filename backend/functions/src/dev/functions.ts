import { sampleResponse } from "../common/sample-response";
import { Request, Response } from "express";
import { getCourseRefByDocId } from "../common/utils";
import { db } from "../common/db";

export const postSurveyBatch = async (req: Request, res: Response) => {
	const courseId = req.params.courseId;

	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;
	const surveyColRef = courseDocRef.collection("survey");

	const batch = db.batch();
	// batched write can contain up to 500 operations
	sampleResponse.forEach((doc) => {
		const { surveyResponse, email, fullName } = doc;
		const surveyDoc = { surveyResponse, fullName, studentId: email };
		const surveyDocRef = surveyColRef.doc();
		batch.set(surveyDocRef, surveyDoc);
	});
	await batch.commit();

	await courseDocRef.set({ submitted: sampleResponse.length }, { merge: true });

	return res.status(201).send("successfully added sample survey response!");
};
