import addResponse from "./users/add-response";
import createCourse from "./courses/create-course";
import createSurveyCsv from "./courses/data-to-csv";
import seedSurveyData from "./users/add-response-batch";

export const newCourse = createCourse;
export const newSurvey = addResponse;
export const newCsv = createSurveyCsv;

export const seedData = seedSurveyData;
