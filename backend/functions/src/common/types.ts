import { Timestamp } from "@google-cloud/firestore";

export interface IIndex {
	[index: string]: any;
}

type SurveyField = {
	hash: string;
	description: string;
};

export type SurveyQuestion = {
	question: SurveyField;
	options: SurveyField[];
};

export type FirestoreCourseDoc = {
	// studentList: string[];
	name: string;
	completed?: string[];
	creator: string;
	dueDate: Timestamp;
	minGroupSize: number;
	config: string | null;
	question?: Object[];
};

export type FirestoreUserDoc = {
	email: string;
	name: string;
	course: string[];
};

export type FirestoreGroupConfigDoc = {
	groupSize?: string;
	studentIdentifier: string;
	rules: { attribute: string; name: string; values?: string }[];
};

export type CoursePatchDoc = {
	name: string;
	config: string;
	minGroupSize: number;
	dueDate: number;
};

// @deprecated.
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
