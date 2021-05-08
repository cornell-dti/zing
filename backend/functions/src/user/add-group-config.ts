import * as functions from "firebase-functions";
import { FirestoreGroupConfigDoc } from "../firestore-types";
import { db } from "../db";

const addGroupConfig = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.set("Access-Control-Allow-Origin", "*");
		if (request.method === "OPTIONS") {
			response.set("Access-Control-Allow-Methods", "POST");
			response.set("Access-Control-Allow-Headers", "Content-Type");
			response.status(204).send("");
		} else {
			createGroupConfig(request, response);
		}
	}
);

const createGroupConfig = async (
	request: functions.https.Request,
	response: functions.Response<any>
) => {
	try {
		const {
			userEmail,
			configName,
			size,
			overflow,
			studentIdentifier,
			rules,
		} = request.body;
		const groupSize = size + (overflow ? "+" : "-");
		const configDoc: FirestoreGroupConfigDoc = {
			groupSize,
			studentIdentifier,
			rules,
		};
		const getUserRef = db
			.collection("userdata")
			.where("email", "==", userEmail)
			.limit(1)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) return null;
				return snapshot.docs[0].ref;
			});

		getUserRef
			.then((user) => {
				if (user === null) throw new Error("Nonexistent email");
				return user.collection("config").doc(configName).set(configDoc);
			})
			.then(() => {
				response
					.status(200)
					.send(`Successfully created configuration ${configName}.`);
			})
			.catch((error) => {
				console.log(error);
				response.status(404).send("Specified user email does not exist!");
				return;
			});
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
};

export default addGroupConfig;
