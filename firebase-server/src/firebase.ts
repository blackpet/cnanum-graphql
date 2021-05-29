import * as admin from 'firebase-admin';

admin.initializeApp({
  // credential: admin.credential.cert(__dirname + "/cnanum-study-firebase-adminsdk-clone.json"),
  credential: admin.credential.applicationDefault(),
});

export const db = admin.firestore();

// db.settings({
//   host: "localhost:8080",
//   ssl: false
// });
