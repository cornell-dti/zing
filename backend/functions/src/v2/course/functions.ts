import * as admin from "firebase-admin";
import { FirestoreCourseDoc } from "../../firestore-types";
import { Timestamp } from "@google-cloud/firestore";
import { db } from "../../db";

export const addCourse = async (
	name: string,
	minGroupSize: number,
	dueDate: string,
	userEmail: string
) => {
	const user = await db
		.collection("userdata")
		.where("email", "==", userEmail)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) return null;
			else {
				const docRef = snapshot.docs[0].ref;
				return docRef;
			}
		});

	if (user == null) throw new Error("Specified user email does not exist!");

	const course: FirestoreCourseDoc = {
		name,
		minGroupSize,
		dueDate: Timestamp.fromDate(new Date(dueDate)),
		creator: userEmail,
		completed: [],
	};

	const courseRef = db.collection("course");

	await courseRef
		.where("name", "==", name)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (!snapshot.empty) {
				throw new Error("Specified zing name already exists!");
			}
			return courseRef.add(course);
		})
		.then((doc) => {
			user.update({
				course: admin.firestore.FieldValue.arrayUnion(doc.id),
			});
		})
		.catch((error) => {
			throw new Error("Could not set group. Error: " + error.message);
		});
};

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

/**
 *  ======================== internal functions =====================
 */

const getConfigRef = async (userEmail: string, configName: string) => {
	return db
		.collection("userdata")
		.where("email", "==", userEmail)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				throw new Error("Specified user email does not exist!");
			}
			return snapshot.docs[0].ref;
		})
		.then((user) => {
			return user.collection("config").doc(configName).get();
		})
		.then((snapshot) => {
			if (!snapshot.exists) {
				throw new Error("Specified config name does not exist!");
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
				throw new Error("Specified course does not exist!");
			}
			return snapshot.ref;
		});
};
