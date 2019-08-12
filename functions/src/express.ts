import * as express from 'express';
import {Course} from './types';
import {db} from './instances';
import * as bodyParser from 'body-parser';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

const app = express();
const main = express();

main.use('/v2', app);
main.use(bodyParser.json());

export async function getCourseList() {
  const courseListSnapshot = await db.collection('courses').get();
  const result: Course[] = [];

  courseListSnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const course_code = doc.id
    const data = doc.data();
    result.push({
      title: data.course_title,
      code: course_code,
    });
  });

  return result;
}

export async function getCourseDetail(code: string) {
  const courseDetail = await db.collection('courses').doc(code).get();
  return courseDetail.data();
}

export async function getClassSchedule(code: string) {
  const classSchedule = await db.collection('schedules').doc(code).get();
  return classSchedule.data();
}

export async function getExamSchedule(code: string) {
  const examSchedule = await db.collection('exams').doc(code).get();
  return examSchedule.data();
}

app.get('/test', (request, response) => {
  response.send('Hello, World!');
});

app.get('/course_list', async (request, response) => {
  try {
    const result: Course[] = await getCourseList();
    response.json(result);
  } catch(e) {
    response.status(500).send(`
    <div>Failed to fetch course list. Here's the log:</div>
    <code>${e}</code>
    `)
  }
})

app.get('/course_detail/:code', async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getCourseDetail(code);
    response.json(result);
  } catch(e) {
    response.status(500).send(`
    <div>Failed to fetch class schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

app.get('/class_schedule/:code', async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getClassSchedule(code);
    response.json(result);
  } catch(e) {
    response.status(500).send(`
    <div>Failed to fetch class schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

app.get('/exam_schedule/:code', async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getExamSchedule(code);
    response.json(result);
  } catch(e) {
    response.status(500).send(`
    <div>Failed to fetch exam schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

export default main;