import * as functions from "firebase-functions";
import { FirestoreUserDoc } from "../firestore-types";
import { auth, db } from "../db";

export const signIn = functions.https.onRequest(
	async (req: functions.https.Request, res: functions.Response) => {
		res.set("Access-Control-Allow-Origin", "*");
		if (req.method === "OPTIONS") {
			res.set("Access-Control-Allow-Methods", "POST");
			res.set("Access-Control-Allow-Headers", "Content-Type");
			res.status(204).send("");
		} else {
			const { email, password } = req.body;
			auth
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					const userId = user.user?.uid;
					res.status(200).send({ success: true, user: userId });
				})
				.catch((err) => res.status(401).send({ success: false, msg: err }));
		}
	}
);

export const signUp = functions.https.onRequest(
	async (req: functions.https.Request, res: functions.Response) => {
		res.set("Access-Control-Allow-Origin", "*");
		if (req.method === "OPTIONS") {
			res.set("Access-Control-Allow-Methods", "POST");
			res.set("Access-Control-Allow-Headers", "Content-Type");
			res.status(204).send("");
		} else {
			// todo: confirm what information is being passed during account creation.
			const { email, password, name } = req.body;
			auth
				.createUserWithEmailAndPassword(email, password)
				.then(async (user) => {
					const userId = user.user?.uid;
					if (!userId) throw new Error("failed to retireve user id.");

					const userDoc: FirestoreUserDoc = {
						email,
						name,
						course: [],
					};

					const userColRef = db.collection("userdata");

					// prettier-ignore
					const doc = await userColRef.doc(userId).get();
					if (doc.exists) {
						return res.status(409).send("Specified email already exists!");
					}

					userColRef.doc(userId).create(userDoc);

					res.status(200).send(`Successfully created a user for ${name}.`);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
		}
	}
);
