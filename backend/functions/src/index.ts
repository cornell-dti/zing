import addResponse from "./user/add-response";
import addCourse from "./course/add-course";
import addSurveyCsv from "./course/data-to-csv";
import seedSurveyData from "./user/add-response-batch";
import addUser from "./user/add-user";
import addGroupConfig from "./user/add-group-config";
import connectGroupConfig from "./course/connect-group-config";

export const newCourse = addCourse;
export const newSurvey = addResponse;
export const newCsv = addSurveyCsv;
export const newUser = addUser;
export const newConfig = addGroupConfig;
export const linkConfig = connectGroupConfig;

export const seedData = seedSurveyData;
