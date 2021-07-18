import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import { SurveyQuestion, IIndex } from "../../../common/types";
import { getCourseRefByDocId } from "../../../common/utils";

export const getSurvey = async (req: Request, res: Response) => {
	const { courseId, email } = req.params;

	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;
	const surveyColRef = courseDocRef.collection("survey");

	const surveyQuery = await surveyColRef
		.where("email", "==", email)
		.limit(1)
		.get();

	if (surveyQuery.empty) {
		return res
			.status(404)
			.send(`Survey for ${email} doesn't exist under course ${courseId}`);
	}
	return res.status(200).send(surveyQuery.docs[0].data());
};

export const postSurvey = async (req: Request, res: Response) => {
	const courseId = req.params.courseId;
	const { email, fullName, surveyResponse } = req.body;
	// Check essential fields in request body
	const isInvalidBody = [courseId, email, fullName, surveyResponse].some(
		(v) => v === undefined
	);
	if (isInvalidBody) {
		return res.status(400).send(
			// eslint-disable-next-line max-len
			"Invalid request: the required fields are: email, fullname, surveyResponse."
		);
	}
	// Get question "schema" from course doc
	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;
	const courseDocSnapshot = await courseDocRef.get();
	const question = courseDocSnapshot.get("question") as SurveyQuestion[];
	// Validate survey response against schema
	if (isSurveyResponseInvalid(surveyResponse, question)) {
		return res.status(400).send("Invalid survey response(s)");
	}
	// Check for existing survey response under email
	const surveyColRef = courseDocRef.collection("survey");
	const surveyQuery = await surveyColRef
		.where("email", "==", email)
		.limit(1)
		.get();
	if (!surveyQuery.empty) {
		return res.status(409).send(
			// eslint-disable-next-line max-len
			`Survey response for ${email} already exists! Use the PATCH endpoint instead.`
		);
	}
	// Write valid surveyResponse to survey subcollection
	const newSurveyDocRef = await surveyColRef.add({
		email,
		fullName,
		surveyResponse,
	});
	// Lastly, increment submission count
	courseDocRef.update({ count: firestore.FieldValue.increment(1) });
	return res.status(200).send(newSurveyDocRef.id);
};

const isSurveyResponseInvalid = (
	surveyResponse: IIndex,
	surveyTemplate: SurveyQuestion[]
) => {
	if (surveyTemplate.length !== Object.keys(surveyResponse).length) {
		return false;
	}

	const isInvalid = surveyTemplate.some((q) => {
		// true if at least 1 invalid field exists
		const questionHash = q.question.hash;
		const optionHashes = q.options.map((field) => field.hash);

		if (!Object.keys(surveyResponse).includes(questionHash)) return true;
		if (!optionHashes.includes(surveyResponse[questionHash])) return true;
		return false;
	});

	return isInvalid;
};
