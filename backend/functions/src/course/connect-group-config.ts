import * as functions from "firebase-functions";
import { db } from "../db";

const connectGroupConfig = functions.https.onRequest(
	async (request: functions.https.Request, response: functions.Response) => {
		response.set("Access-Control-Allow-Origin", "*");
		if (request.method === "OPTIONS") {
			response.set("Access-Control-Allow-Methods", "POST");
			response.set("Access-Control-Allow-Headers", "Content-Type");
			response.status(204).send("");
		} else {
			connect(request, response);
		}
	}
);

const connect = async (
	request: functions.https.Request,
	response: functions.Response<any>
) => {
	try {
		const { userEmail, configName, courseId } = request.body;
		Promise.all([getConfigRef(userEmail, configName), getCourseRef(courseId)])
			.then(([configRef, courseRef]) => {
				courseRef.update({ config: configRef.id });
				response
					.status(200)
					.send(`Successfully linked config ${configName} with ${courseId}.`);
			})
			.catch((error) => {
				console.log(error);
				response.status(409).send(error.toString());
				return;
			});
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
};

const getConfigRef = async (userEmail: string, configName: string) => {
	return db
		.collection("userdata")
		.where("email", "==", userEmail)
		.limit(1)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				throw new Error("Specified user email does not exist!");
			}
			return snapshot.docs[0].ref;
		})
		.then((user) => {
			return user.collection("config").doc(configName).get();
		})
		.then((snapshot) => {
			if (!snapshot.exists) {
				throw new Error("Specified config name does not exist!");
			}
			return snapshot.ref;
		});
};

const getCourseRef = async (courseId: string) => {
	return db
		.collection("course")
		.doc(courseId)
		.get()
		.then((snapshot) => {
			if (!snapshot.exists) {
				throw new Error("Specified course does not exist!");
			}
			return snapshot.ref;
		});
};
export default connectGroupConfig;
