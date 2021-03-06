import * as functions from "firebase-functions";
import { FirestoreSurveyDataDoc } from "../../types/firestore-types";
import { db } from "./db";

type SurveyData = {
	classId: string;
	data: FirestoreSurveyDataDoc;
};

const addResponse = async (
	data: SurveyData,
	context: functions.https.CallableContext
): Promise<string> => {
	try {
		const { classId } = data;
		const surveyCollection = await db
			.collection("surveys")
			.where("classID", "==", classId)
			.get()
			.then((querySnapshot) => {
				const surveyDoc = querySnapshot.docs[0];
				return surveyDoc.ref.collection("surveyData");
			});
		const surveyData: FirestoreSurveyDataDoc = { ...data.data };
		const doc = await surveyCollection.add(surveyData);
		return doc.id;
	} catch (e) {
		console.error(e);
		return e;
	}
};

export default addResponse;
