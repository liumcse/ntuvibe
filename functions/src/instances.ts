import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(
  /** TODO(liumcse): Put service account credentials in here */ functions.config()
    .firebase
);

export const db = admin.firestore();
