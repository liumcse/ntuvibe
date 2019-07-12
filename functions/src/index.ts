import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp(/** TODO(liumcse): Put service account credentials in here */)

export const populateCourseInfo = functions.https.onRequest(async (request, response) => {
  const db = admin.firestore();
  const {data: {data: courseList} } = await axios.get('https://api.ntuvibe.com/courses/get_course_by_search?search=&filter=1&sort=0');
  for (const courseInfo of courseList) {
    await db.collection('courses').doc(courseInfo.code).set(courseInfo);
    console.log('Wrote');
  }
  response.send('Completed');
})

export const scheduledFunction = functions.pubsub.schedule('every 30 seconds').onRun(context => {
  console.log('Running, with context');
  console.log(context);
})

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
})