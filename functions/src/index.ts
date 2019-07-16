import * as functions from 'firebase-functions';
import express from './express';

export const webApi = functions.region('asia-east2').https.onRequest(express);

// export const populateCourseInfo = functions.region('asia-east2').https.onRequest(async (request, response) => {
//   const {data: {data: courseList} } = await axios.get('https://api.ntuvibe.com/courses/get_course_by_search?search=&filter=1&sort=0');
//   for (const courseInfo of courseList) {
//     await db.collection('courses').doc(courseInfo.code).set(courseInfo);
//     console.log('Wrote');
//   }
//   response.send('Completed');
// });

// export const scheduledFunction = functions.region('asia-east2').pubsub.schedule('every 30 seconds').onRun(context => {
//   console.log('Running, with context');
//   console.log(context);
// });