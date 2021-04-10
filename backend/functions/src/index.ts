import addResponse from "./user/add-response";
import createCourse from "./course/create-course";
import createSurveyCsv from "./course/data-to-csv";
import seedSurveyData from "./user/add-response-batch";

export const newCourse = createCourse;
export const newSurvey = addResponse;
export const newCsv = createSurveyCsv;

export const seedData = seedSurveyData;
