import { FirestoreGroupConfigDoc } from "../../firestore-types";
import * as admin from "firebase-admin";
import { FirestoreSurveyDoc, FirestoreUserDoc } from "../../firestore-types";
import { idInCourseList } from "../../utils";
import { db } from "../../db";

export const createGroupConfig = async (
  userEmail: string,
  configName: string,
  size: any,
  overflow: string,
  studentIdentifier: string,
  rules: any
) => {
  try {
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
      .catch((error) => {
        console.log(error);
        throw new Error("Specified user email does not exist!");
      });
  } catch (error) {
    console.log(error);
    throw new Error("error: " + error.message);
  }
};

// TODO: Change types accordingly
export const addOrUpdateSurvey = async (
  courseId: string,
  fullName: string,
  studentId: string,
  identity: FirestoreSurveyDoc["identity"],
  pronoun: FirestoreSurveyDoc["pronoun"],
  graduation: FirestoreSurveyDoc["graduation"],
  college: FirestoreSurveyDoc["college"],
  remote: FirestoreSurveyDoc["remote"],
  mode: FirestoreSurveyDoc["mode"],
  time: FirestoreSurveyDoc["time"],
  start: FirestoreSurveyDoc["start"]
) => {
  try {
    const surveyDoc: FirestoreSurveyDoc = {
      fullName,
      studentId,
      identity,
      pronoun,
      graduation,
      college,
      remote,
      mode,
      time,
      start,
    };
    const courseRef = db.collection("course").doc(courseId);
    await courseRef.get().then((docSnapshot) => {
      if (docSnapshot.exists && idInCourseList(studentId, docSnapshot)) {
        courseRef.onSnapshot((doc) => {
          const surveyColRef = doc.ref.collection("survey");
          surveyColRef
            .where("studentId", "==", studentId)
            .limit(1)
            .get()
            .then((snapshot) => {
              let docExists = false;
              if (!snapshot.empty) {
                docExists = true;
                snapshot.forEach((doc) => {
                  doc.ref.update(surveyDoc);
                });
              }
              return docExists;
            })
            .then((docExists) => {
              if (!docExists) {
                doc.ref.update({
                  completed: admin.firestore.FieldValue.arrayUnion(studentId),
                });
                doc.ref.collection("survey").add(surveyDoc);
              }
            });
        });
      } else {
        throw new Error(
          "Something went wrong! Either the course does not exist or this is not a valid student. "
        );
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("error: " + error.message);
  }
};

export const createUser = async (email: string, name: string) => {
  try {
    const userDoc: FirestoreUserDoc = {
      email,
      name,
      course: [],
    };
    const userColRef = db.collection("userdata");
    // prettier-ignore
    await userColRef
			.where("email", "==", email)
			.limit(1)
			.get()
			.then((snapshot) => {
				if (!snapshot.empty) {
					throw new Error("Specified email already exists!");
				}
			});
    userColRef.doc().create(userDoc);
  } catch (error) {
    console.log(error);
    throw new Error("error: " + error.message);
  }
};
