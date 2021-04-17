import addResponse from "./user/add-response";
import createCourse from "./course/create-course";
import createSurveyCsv from "./course/data-to-csv";
import seedSurveyData from "./user/add-response-batch";
import addUser from "./user/add-user";

export const newCourse = createCourse;
export const newSurvey = addResponse;
export const newCsv = createSurveyCsv;
export const newUser = addUser;

export const seedData = seedSurveyData;
