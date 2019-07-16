import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as types from './types';
// @ts-ignore
import axios from 'axios';

admin.initializeApp(/** TODO(liumcse): Put service account credentials in here */);

const app = express();
const main = express();
const db = admin.firestore();

main.use('/api/v2', app);
main.use(bodyParser.json());

async function getCourseList() {
  const courseListSnapshot = await db.collection('courses').get();
  const result: types.Course[] = [];

  courseListSnapshot.forEach((doc: any) => {
    result.push({
      title: doc.title,
      code: doc.code
    });
  });

  return result;
}

export const webApi = functions.region('asia-east2').https.onRequest(main);
export const debug = functions.region('asia-east2').https.onRequest(async (request, response) => {
  console.log(await getCourseList());
})

app.get('/test', (request, response) => {
  response.send('Hello, World!');
});

app.get('/course_list', async (_, response) => {
  const courseListSnapshot = await db.collection('courses').get();
  const result: types.Course[] = [];

  courseListSnapshot.forEach((doc: any) => {
    result.push({
      title: doc.title,
      code: doc.code
    });
  });

  response.json(result);
})

export const populateCourseInfo = functions.region('asia-east2').https.onRequest(async (request, response) => {
  const {data: {data: courseList} } = await axios.get('https://api.ntuvibe.com/courses/get_course_by_search?search=&filter=1&sort=0');
  for (const courseInfo of courseList) {
    await db.collection('courses').doc(courseInfo.code).set(courseInfo);
    console.log('Wrote');
  }
  response.send('Completed');
});

// export const scheduledFunction = functions.region('asia-east2').pubsub.schedule('every 30 seconds').onRun(context => {
//   console.log('Running, with context');
//   console.log(context);
// });

// export const helloWorld = functions.region('asia-east2').https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });