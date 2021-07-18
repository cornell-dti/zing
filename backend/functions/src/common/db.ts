import * as admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = require("../../firebase_config.json");
const serviceAccount = require("../../service_account.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp(firebaseConfig);
export const storage = admin.storage();
export const db = admin.firestore();
export const adminAuth = admin.auth();
export const auth = firebase.auth();
