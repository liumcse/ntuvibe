import {db} from './instances';
import {Course} from './types';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

export async function getCourseList() {
  const courseListSnapshot = await db.collection('courses').get();
  const result: Course[] = [];

  courseListSnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const course_code = doc.id
    const data = doc.data();
    result.push({
      title: data.course_title,
      code: course_code,
      postgrad: data.postgrad,
    });
  });

  return result;
}

export async function cacheCourseListSnapshot() {
  const courseListSnapshot = await db.collection("courses").get();
  const result: Course[] = [];

  courseListSnapshot.forEach((doc: QueryDocumentSnapshot) => {
    const course_code = doc.id
    const data = doc.data();
    result.push({
      title: data.course_title,
      code: course_code,
      postgrad: data.postgrad,
    });
  });

  await db.collection("cache").doc("courses").set({data: JSON.stringify(result)});
}