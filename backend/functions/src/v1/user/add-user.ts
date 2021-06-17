import * as functions from "firebase-functions";
import { FirestoreUserDoc } from "../../firestore-types";
import { db } from "../../db";

const addUser = functions.https.onRequest(
  async (request: functions.https.Request, response: functions.Response) => {
    response.set("Access-Control-Allow-Origin", "*");
    if (request.method === "OPTIONS") {
      response.set("Access-Control-Allow-Methods", "POST");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.status(204).send("");
    } else {
      createUser(request, response);
    }
  }
);

const createUser = async (
  request: functions.https.Request,
  response: functions.Response<any>
) => {
  try {
    const { email, name } = request.body;
    const userDoc: FirestoreUserDoc = {
      email,
      name,
      course: [],
    };
    let docExists = false;
    const userColRef = db.collection("user");
    // prettier-ignore
    await userColRef
			.where("email", "==", email)
			.limit(1)
			.get()
			.then((snapshot) => {
				if (!snapshot.empty) {
					response.status(409).send("Specified email already exists!");
					docExists = true;
				}
			});
    if (docExists) return;
    userColRef.doc().create(userDoc);
    response.status(200).send(`Successfully created a user for ${name}.`);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

export default addUser;
