import * as express from "express";
import { Course } from "./types";
import { db } from "./instances";
import * as bodyParser from "body-parser";

const app = express();
const main = express();

main.use("/v2", app);
main.use(bodyParser.json());

/**
 * Returns a list of all courses (code, title, postgrad) in JSON format.
 */
export async function getCourseListFromCache() {
  const cacheRef = await db.collection("cache");
  const snapshot = await cacheRef.doc("courses").get();
  let result = [];
  if (typeof snapshot.data() !== "undefined") {
    // @ts-ignore
    result = JSON.parse(snapshot.data().data);
  }
  return result;
}
/**
 * Returns detail of a course in JSON format.
 * @param code Course code. E.g. 'CZ3006', case sensitive
 */
export async function getCourseDetail(code: string) {
  const courseDetail = await db
    .collection("courses")
    .doc(code)
    .get();
  return courseDetail.data() || {};
}

/**
 * Returns a list of class schedules of a course in JSON format.
 * @param code Course code. E.g. 'CZ3006', case sensitive
 */
export async function getClassSchedule(code: string) {
  const classSchedule = await db
    .collection("schedules")
    .doc(code)
    .get();
  return classSchedule.data() || {};
}

/**
 * Returns exam schedule of a course in JSON format.
 * @param code Course code. E.g. 'CZ3006', case sensitive
 */
export async function getExamSchedule(code: string) {
  const examSchedule = await db
    .collection("exams")
    .doc(code)
    .get();
  return examSchedule.data() || {};
}

app.get("/", (request, response) => {
  response.send(`<pre><code>Hello! Here's a list of APIs available:
    /course_list            returns a list of courses with their code, title, and level (undergrad/postgrad)
    /course_detail/:code    returns details of a specific course
    /class_schedule/:code   returns class schedules of a specific course
    /exam_schedule/:code    returns exam schedules of a specific course
  </code></pre>`);
});

app.get("/course_list", async (request, response) => {
  try {
    const result: Course[] = await getCourseListFromCache();
    response.json(result);
  } catch (e) {
    response.status(500).send(`
    <div>Failed to fetch course list. Here's the log:</div>
    <code>${e}</code>
    `);
  }
});

app.get("/course_detail/:code", async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getCourseDetail(code);
    response.json(result);
  } catch (e) {
    response.status(500).send(`
    <div>Failed to fetch class schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

app.get("/class_schedule/:code", async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getClassSchedule(code);
    response.json(result);
  } catch (e) {
    response.status(500).send(`
    <div>Failed to fetch class schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

app.get("/exam_schedule/:code", async (request, response) => {
  const code = request.params.code && request.params.code.toUpperCase();
  try {
    const result = await getExamSchedule(code);
    response.json(result);
  } catch (e) {
    response.status(500).send(`
    <div>Failed to fetch exam schedule for ${code}. Here's the log:</div>
    <code>${e}</code>`);
  }
});

export default main;
