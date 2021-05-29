import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import {firestore} from 'firebase-admin/lib/firestore';
import QuerySnapshot = firestore.QuerySnapshot;
import DocumentData = firestore.DocumentData;

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from cNanum!");
});

export const setMyFirstData = functions.https.onRequest(async (request, response) => {
  // cnanum collection data 가져오기
  const snapshot: QuerySnapshot<DocumentData> = await admin.firestore().collection('cnanum').get();


  response.json(snapshot.docs.map((doc) => doc.data()));
});
