import * as admin from "firebase-admin";
import { DocumentSnapshot } from "@google-cloud/firestore";
import { FirestoreCourseDoc } from "../../firestore-types";
import { db, storage } from "../../db";
import { parseAsync } from "json2csv";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export const addCourse = async (
  courseId: string,
  studentList: string[],
  userEmail: string
) => {
  const user = await db
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

  if (user == null) throw new Error("Specified user email does not exist!");

  const course: FirestoreCourseDoc = {
    studentList,
    completed: [],
    creator: user.id,
  };

  const groupDocRef = db.collection("course").doc(courseId);

  await groupDocRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        throw new Error("Specified groupId already exists!");
      }
      return snapshot.ref.set(course, { merge: true });
    })
    .catch((error) => {
      throw new Error("Could not set group. Error: " + error.message);
    });
};

export const connectGroupConfig = (
  userEmail: string,
  configName: string,
  courseId: string
) => {
  return Promise.all([
    getConfigRef(userEmail, configName),
    getCourseRef(courseId),
  ])
    .then(([configRef, courseRef]) => {
      courseRef.update({ config: configRef.id });
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

const createSurveyCsv = async (courseId: string) => {
  const fields = [
    "fullName",
    "studentId",
    "identity",
    "pronoun",
    "graduation",
    "college",
    "remote",
    "mode",
    "time",
    "start",
  ];

  try {
    const surveySnapshot = await db
      .collection("course")
      .doc(courseId)
      .collection("survey")
      .get();

    // prettier-ignore
    const surveyDocs = surveySnapshot.docs.map(
    (doc: DocumentSnapshot) => doc.data()
  );

    const outputCsv = await parseAsync(surveyDocs, { fields });
    const filename = `${courseId}.csv`;
    const tempFile = path.join(os.tmpdir(), filename);

    return new Promise<void>((resolve, reject) => {
      fs.writeFile(tempFile, outputCsv, (error) => {
        if (error) {
          reject(error);
          return;
        }
        const bucket = storage.bucket();

        bucket
          .upload(tempFile, {
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
              },
            },
          })
          .then(() => resolve())
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *  ======================== internal functions =====================
 */

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
