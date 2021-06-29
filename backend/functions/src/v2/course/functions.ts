import * as admin from "firebase-admin";
import { FirestoreCourseDoc } from "../../firestore-types";
import { Timestamp, FieldValue } from "@google-cloud/firestore";
import { db, pubsub } from "../../db";
import { Request, Response } from "express";
import { CoursePatchDoc } from "../../request-types";

export const postCourse = async (req: Request, res: Response) => {
	// need data validation
	const { name, minGroupSize, dueDate, userEmail, config } = req.body;

	let user: FirebaseFirestore.DocumentReference;
	try {
		user = await getUserRef(userEmail);
	} catch (err) {
		return res.status(404);
	}

	const courseColRef = db.collection("course");
	const course: FirestoreCourseDoc = {
		name,
		minGroupSize,
		dueDate: Timestamp.fromDate(new Date(dueDate)),
		creator: userEmail,
		config: config ? config : null,
		completed: [],
	};

	const docIdQuery = await courseColRef
		.where("creator", "==", userEmail)
		.where("name", "==", name)
		.limit(1);
	const prevDocRef = await docIdQuery.get();
	if (!prevDocRef.empty) {
		return res
			.status(409)
			.send(`Zing name ${name} already exists under ${userEmail}!`);
	}
	const newDocRef = await courseColRef.add(course);
	const docId = newDocRef.id;
	await user.update({
		course: admin.firestore.FieldValue.arrayUnion(docId),
	});
	return res.status(201).send(docId);
};

export const getCourse = async (req: Request, res: Response) => {
	const courseDocId = req.params.courseDocId;
	let courseDocRef: FirebaseFirestore.DocumentReference;
	try {
		courseDocRef = await getCourseRef(courseDocId);
	} catch (err) {
		return res.status(404).send(err.toString());
	}

	const courseDocSnapshot = await courseDocRef.get();
	const courseData = courseDocSnapshot.data();

	res.status(200).send(courseData);
};

export const patchCourse = async (req: Request, res: Response) => {
	const courseDocId = req.params.courseDocId;
	let courseDocRef: FirebaseFirestore.DocumentReference;
	try {
		courseDocRef = await getCourseRef(courseDocId);
	} catch (err) {
		return res.status(404).send(err.toString());
	}

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
		const userEmail = courseDocSnapshot.get("creator");
		await connectGroupConfig(userEmail, config, courseDocId);
	}

	await courseDocRef.update(patchDoc);
	return res.status(200).send();
};

export const deleteCourse = async (req: Request, res: Response) => {
	const courseDocId = req.params.courseDocId;

	let courseDocRef: FirebaseFirestore.DocumentReference;
	try {
		courseDocRef = await getCourseRef(courseDocId);
	} catch (err) {
		return res.status(404).send(err.toString());
	}

	const courseDocSnapshot = await courseDocRef.get();
	const userEmail = courseDocSnapshot.get("creator");
	let user: FirebaseFirestore.DocumentReference;
	try {
		user = await getUserRef(userEmail);
	} catch (err) {
		return res.status(404);
	}

	const config = courseDocSnapshot.get("config");
	if (typeof config !== "undefined") {
		await user.update({
			array: FieldValue.arrayRemove(config),
		});
	}

	const surveyRef = courseDocRef.collection("survey");
	const groupRef = courseDocRef.collection("group");

	await deleteCollection(surveyRef);
	await deleteCollection(groupRef);
	await courseDocRef.delete();

	res.status(200).send();
};

export const postCourseCsv = async (req: Request, res: Response) => {
	const courseDocId = req.params.courseDocId;

	let courseDocRef: FirebaseFirestore.DocumentReference;
	try {
		courseDocRef = await getCourseRef(courseDocId);
	} catch (err) {
		return res.status(404).send(err.toString());
	}

	const surveyColSnapshot = await courseDocRef.collection("survey").get();
	if (surveyColSnapshot.empty) {
		return res.status(404).send("there are no survey responses yet!");
	}
};

export const groupCourse = async (req: Request, res: Response) => {
	if (!req.params.courseDocId) {
		res.status(400).send("Missing parameter: include courseDocId property.");
		return;
	}

	const topic = pubsub.topic("groupeng");
	const messageObject = {
		data: req.params.courseDocId,
	};
	const messageBuffer = Buffer.from(JSON.stringify(messageObject), "utf8");

	try {
		await topic.publish(messageBuffer);
		res.status(200).send("Successfully published request for grouping!");
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
		return Promise.reject(err);
	}
};

/**
 *  ======================== internal functions =====================
 */

export const connectGroupConfig = (
	userEmail: string,
	configName: string,
	courseId: string
) => {
	return Promise.all([
		getConfigRef(userEmail, configName),
		getCourseRef(courseId),
	])
		.then(([configRef, courseRef]) => {
			courseRef.update({ config: configRef.id });
		})
		.catch((error) => {
			console.log(error);
			return;
		});
};

const getConfigRef = async (userEmail: string, configName: string) => {
	return db
		.collection("userdata")
		.where("email", "==", userEmail)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				throw new Error(`User ${userEmail} does not exist!`);
			}
			return snapshot.docs[0].ref;
		})
		.then((user) => {
			return user.collection("config").doc(configName).get();
		})
		.then((snapshot) => {
			if (!snapshot.exists) {
				throw new Error(
					`Config ${configName} does not exist under user ${userEmail}!`
				);
			}
			return snapshot.ref;
		});
};

const getCourseRef = async (courseId: string) => {
	return db
		.collection("course")
		.doc(courseId)
		.get()
		.then((snapshot) => {
			if (!snapshot.exists) {
				throw new Error(`Course ${courseId} does not exist!`);
			}
			return snapshot.ref;
		});
};

const getUserRef = async (userEmail: string) => {
	const user = await db
		.collection("userdata")
		.where("email", "==", userEmail)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				throw new Error(`User ${userEmail} does not exist!`);
			} else {
				const docRef = snapshot.docs[0].ref;
				return docRef;
			}
		});
	return user;
};

const deleteCollection = async (
	collectionRef: FirebaseFirestore.CollectionReference,
	batchSize: number = 50
) => {
	const query = collectionRef.orderBy("__name__").limit(batchSize);

	return new Promise((resolve, reject) => {
		deleteQueryBatch(query, resolve).catch(reject);
	});
};

const deleteQueryBatch = async (
	query: FirebaseFirestore.Query,
	resolve: any
) => {
	const snapshot = await query.get();

	const batchSize = snapshot.size;
	if (batchSize === 0) {
		// When there are no documents left, we are done
		resolve();
		return;
	}

	// Delete documents in a batch
	const batch = db.batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	// Recurse on the next process tick, to avoid
	// exploding the stack.
	process.nextTick(() => {
		deleteQueryBatch(query, resolve);
	});
};
