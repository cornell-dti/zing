import * as functions from "firebase-functions";
import createSurveyCsv from "./data-to-csv";
import addResponse from "./add-response";

export const generateInputCsv = functions.https.onCall(createSurveyCsv);

export const addStudentResponse = functions.https.onCall(addResponse);
