import * as express from 'express';
import {Course} from './types';
import {db} from './instances';
import * as bodyParser from 'body-parser';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

const app = express();
const main = express();

main.use('/api/v2', app);
main.use(bodyParser.json());

async function getCourseList() {
  const courseListSnapshot = await db.collection('courses').get();
  const result: Course[] = [];

  courseListSnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data();
    result.push({
      title: data.title,
      code: data.code
    });
  });

  return result;
}

app.get('/test', (_, response) => {
  response.send('Hello, World!');
});

app.get('/course_list', async (_, response) => {
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

export default main;