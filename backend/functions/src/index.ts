import addResponse from "./users/add-response";
import createCourse from "./courses/create-course";
import createSurveyCsv from "./courses/data-to-csv";

export const newCourse = createCourse;
export const newSurvey = addResponse;
export const newCsv = createSurveyCsv;
