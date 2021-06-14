/**
 * ==================== V1 Code =======================
 */

import addResponse from "./v1/user/add-response";
import addCourse from "./v1/course/add-course";
import addSurveyCsv from "./v1/course/data-to-csv";
import seedSurveyData from "./v1/user/add-response-batch";
import addUser from "./v1/user/add-user";
import addGroupConfig from "./v1/user/add-group-config";
import connectGroupConfig from "./v1/course/connect-group-config";
import { signIn, signUp } from "./v1/auth";

export const newCourse = addCourse;
export const newSurvey = addResponse;
export const newCsv = addSurveyCsv;
export const newUser = addUser;
export const newConfig = addGroupConfig;
export const linkConfig = connectGroupConfig;
export const signUpUser = signUp;
export const signInUser = signIn;
export const seedData = seedSurveyData;

/**
 * ==================== V2 Code =======================
 */

import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";

const app = express();

// import all routers
import courseRoutes from "./v2/course/routes";
import userRoutes from "./v2/course/routes";

// Automatically allow cross-origin requests. NEED TO CHANGE.
app.use(cors({ origin: true }));

// allow for body parsing
app.use(express.json());

// set up routes
app.use("/v2/course", courseRoutes);
app.use("/v2/user", userRoutes);

export const api = functions.https.onRequest(app);
