import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const db = admin.firestore();

// db.settings({
//   host: "localhost:8080",
//   ssl: false
// });
