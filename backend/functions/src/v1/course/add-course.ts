import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FirestoreCourseDoc } from "../../firestore-types";
import { db } from "../../db";

const addCourse = functions.https.onRequest(
  async (request: functions.https.Request, response: functions.Response) => {
    response.set("Access-Control-Allow-Origin", "*");
    if (request.method === "OPTIONS") {
      // Send response to OPTIONS requests
      response.set("Access-Control-Allow-Methods", "POST");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.status(204).send("");
    } else {
      createCourse(request, response);
    }
  }
);

const createCourse = async (
  request: functions.https.Request,
  response: functions.Response<any>
) => {
  try {
    const { courseId, studentList, userEmail } = request.body;
    const getUserRef = db
      .collection("userdata")
      .where("email", "==", userEmail)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) return null;
        else {
          const docRef = snapshot.docs[0].ref;
          docRef.update({
            course: admin.firestore.FieldValue.arrayUnion(courseId),
          });
          return docRef;
        }
      });

    getUserRef.then((user) => {
      if (user === null) {
        throw new Error("Specified user email does not exist!");
      }
      const course: FirestoreCourseDoc = {
        studentList,
        completed: [],
        creator: user.id,
      };
      const groupDocRef = db.collection("course").doc(courseId);
      groupDocRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            throw new Error("Specified groupId already exists!");
          }
          return snapshot.ref.set(course, { merge: true });
        })
        .then((result) => {
          response.status(200).send(`Successfully created a document\n 
						for ${courseId}, ${result.writeTime}.`);
        })
        .catch((error) => {
          console.log(error);
          response.status(409).send(error);
          return;
        });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

export default addCourse;
