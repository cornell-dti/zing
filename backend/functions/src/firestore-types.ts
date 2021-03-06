export type FirestoreSurveyDoc = {
	readonly classID: string;
	readonly surveyData: readonly FirestoreSurveyDataDoc[];
};

export type FirestoreSurveyDataDoc = {
	id: string;
	gpa: number;
	gender: string;
	ethnicity: string;
	major: string;
	skill1: string;
	skill2: string;
	skill3: string;
	project_choice: string;
};
