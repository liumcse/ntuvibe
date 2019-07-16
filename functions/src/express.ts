import * as express from 'express';
import {Course} from './types';
import {db} from './instances';
import * as bodyParser from 'body-parser';

const app = express();
const main = express();

main.use('/api/v2', app);
main.use(bodyParser.json());

async function getCourseList() {
  const courseListSnapshot = await db.collection('courses').get();
  const result: Course[] = [];

  courseListSnapshot.forEach((doc: any) => {
    result.push({
      title: doc.title,
      code: doc.code
    });
  });

  return result;
}

app.get('/test', (_, response) => {
  response.send('Hello, World!');
});

app.get('/course_list', async (_, response) => {
  const result: Course[] = await getCourseList();
  response.json(result);
})

export default main;