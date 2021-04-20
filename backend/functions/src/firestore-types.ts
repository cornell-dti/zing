/* eslint-disable max-len */
export type FirestoreSurveyDoc = {
	fullName: string;
	studentId: string;
	identity: "a" | "b" | "c" | "d" | "e" | "f" | "g";
	pronoun: "a" | "b" | "c" | "d";
	graduation: "a" | "b" | "c" | "d" | "e";
	college: "a" | "b" | "c" | "d" | "e" | "f" | "g";
	remote: "a" | "b" | "c";
	mode: "a" | "b" | "c";
	time: "a" | "b" | "c" | "d";
	start: "a" | "b" | "c" | "d" | "e";
};

export type FirestoreCourseDoc = {
	studentList: string[];
	completed: string[];
	creator: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
};

export type FirestoreUserDoc = {
	email: string;
	name: string;
	course: string[];
};

export type FirestoreGroupConfigDoc = {
	groupSize: string;
};
