import * as admin from "firebase-admin";
import {
	FirestoreCourseDoc,
	CoursePatchDoc,
	IIndex,
	SurveyQuestion,
} from "../../common/types";
import { Timestamp, FieldValue } from "@google-cloud/firestore";
import { db } from "../../common/db";
import { Request, Response } from "express";
import { defaultQuestions } from "../../common/question";
import {
	getUserRefByEmail,
	getCourseRefByDocId,
	connectGroupConfig,
	deleteCollectionByRef,
	getDocsDataByColRef,
	getBasicCourseById,
} from "../../common/utils";

export const postCourse = async (req: Request, res: Response) => {
	// TODO: add data validation
	const { name, minGroupSize, dueDate, email, config } = req.body;

	const user = (await getUserRefByEmail(email).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;

	// check for duplicate coursename under same instructor
	const courseColRef = db.collection("course");
	const docIdQuery = await courseColRef
		.where("creator", "==", email)
		.where("name", "==", name)
		.limit(1);
	const prevDocRef = await docIdQuery.get();
	if (!prevDocRef.empty) {
		return res
			.status(409)
			.send(`Zing name ${name} already exists under ${email}!`);
	}

	// create course doc and add default values if necessary
	const course: FirestoreCourseDoc = {
		name,
		minGroupSize,
		dueDate: Timestamp.fromDate(new Date(dueDate)),
		creator: email,
		config: config ? config : "default",
		completed: [],
		question: defaultQuestions, // default question format
	};

	// add course document and update instructor courselist
	const newDocRef = await courseColRef.add(course);
	const docId = newDocRef.id;
	await user.update({
		course: admin.firestore.FieldValue.arrayUnion(docId),
	});
	return res.status(201).send(docId);
};

export const patchCourse = async (req: Request, res: Response) => {
	const courseId = req.params.courseId;
	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;

	const { name, config, minGroupSize, dueDate } = req.body;
	const patchDoc = {
		name,
		config,
		minGroupSize,
		dueDate,
	};

	Object.keys(patchDoc).forEach((e) => {
		const key = e as keyof CoursePatchDoc;
		if (typeof patchDoc[key] === "undefined") delete patchDoc[key];
	});

	if ("config" in patchDoc) {
		const courseDocSnapshot = await courseDocRef.get();
		const email = courseDocSnapshot.get("creator");
		await connectGroupConfig(email, config, courseId);
	}

	await courseDocRef.update(patchDoc);
	return res.status(200).send();
};

export const deleteCourse = async (req: Request, res: Response) => {
	const courseId = req.params.courseId;
	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;

	const courseDocSnapshot = await courseDocRef.get();
	const email = courseDocSnapshot.get("creator");
	const user = (await getUserRefByEmail(email).catch((err) => {
		return res.status(404).send(err.toString());
	})) as FirebaseFirestore.DocumentReference;

	const config = courseDocSnapshot.get("config");
	if (typeof config !== "undefined") {
		await user.update({
			array: FieldValue.arrayRemove(config),
		});
	}

	const surveyRef = courseDocRef.collection("survey");
	const groupRef = courseDocRef.collection("group");

	await deleteCollectionByRef(surveyRef);
	await deleteCollectionByRef(groupRef);
	await courseDocRef.delete();

	res.status(200).send();
};

export const getCourse = async (req: Request, res: Response) => {
	const courseId = req.params.courseId;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const courseDocRef = (await getCourseRefByDocId(courseId).catch((err) => {
		return res.status(404).send(`Course with id ${courseId} is not found`);
	})) as FirebaseFirestore.DocumentReference;

	const courseData = await getBasicCourseById(courseId);
	const question = (await courseDocRef
		.get()
		.then((snapshot) => snapshot.get("question"))) as SurveyQuestion[];
	const surveyColRef = courseDocRef.collection("survey");
	const groupColRef = courseDocRef.collection("group");

	const surveyData = await getDocsDataByColRef(surveyColRef);
	const groupData = await getGroupDataByColRef(groupColRef, question);

	const result = { ...courseData, survey: surveyData, group: groupData };
	return res.status(200).send(result);
};

const getGroupDataByColRef = async (
	groupColRef: FirebaseFirestore.CollectionReference,
	question: SurveyQuestion[]
) => {
	const groupDocRefList = await groupColRef.listDocuments();
	const allGroupsData: IIndex = {};
	for (const docRef of groupDocRefList) {
		const groupId = docRef.id;
		allGroupsData[groupId] = await getGroupDataByDocRef(docRef, question);
	}
	return allGroupsData;
};

const getGroupDataByDocRef = async (
	groupDocRef: FirebaseFirestore.DocumentReference,
	question: SurveyQuestion[]
) => {
	const groupSnapshot = await groupDocRef.get();
	const groupData = groupSnapshot.data();
	const memberColRef = groupDocRef.collection("members");
	const memberData = await getMemberDataByColRef(memberColRef, question);
	return { groupData, members: memberData };
};

const getMemberDataByColRef = async (
	colRef: FirebaseFirestore.CollectionReference,
	question: SurveyQuestion[]
) => {
	const questionObj = getQuestionObj(question) as IIndex;
	const questionHashes = Object.keys(questionObj);
	const docRefList = await colRef.listDocuments();
	const allDocsData = await Promise.all(
		docRefList.map(async (docRef) => {
			const docSnapshot = (await docRef.get()) as IIndex;
			const docData = docSnapshot.data();
			Object.keys(docData).forEach((qHash) => {
				if (questionHashes.includes(qHash)) {
					const optionString = questionObj[qHash][docData[qHash]];
					docData[qHash] = optionString;
				}
			});
			return docData;
		})
	);
	return allDocsData;
};

const getQuestionObj = (question: SurveyQuestion[]) => {
	const questionObj = question.reduce((acc, obj) => {
		const optionsObj = obj.options.reduce((acc, obj) => {
			return {
				...acc,
				[obj.hash]: obj.description,
			};
		}, {});
		return {
			...acc,
			[obj.question.hash]: optionsObj,
		};
	}, {});
	return questionObj;
};
