import { CourseType } from "./typings";
import { getDbInstance } from "../connections/connections";
import { Db, Collection } from "mongodb";

/** Model for course. */
class Course {
  private db: Db;
  private collection: Collection;

  constructor() {
    this.db = getDbInstance();
    this.collection = this.db.collection("courses");
  }

  private async getCourse(query: object): Promise<CourseType | null> {
    const result = await this.collection.findOne<CourseType>(query, {
      projection: {
        course_code: 1,
        course_title: 1,
        au: 1,
        constraint: 1,
        pass_fail: 1,
        semesters: 1,
        description: 1,
        last_update: 1,
        postgrad: 1,
      },
    });
    if (!result) return null;
    return result;
  }

  /** Returns course object with matching course code. */
  async getOneByCode(courseCode: string): Promise<CourseType | null> {
    return await this.getCourse({ course_code: courseCode.toUpperCase() });
  }

  /** Returns an array of all courses. */
  async getAll(): Promise<CourseType[]> {
    const projection = {
      course_code: 1,
      course_title: 1,
      au: 1,
      constraint: 1,
      pass_fail: 1,
      semesters: 1,
      description: 1,
      last_update: 1,
      postgrad: 1,
    };
    return await this.collection
      .aggregate<CourseType>([
        {
          $project: projection,
        },
      ])
      .toArray();
  }

  /** Update a course. */
  async updateOne(courseCode: string, fields: object) {
    courseCode = courseCode.toUpperCase();
    await this.collection.updateOne(
      {
        course_code: courseCode,
      },
      {
        $set: fields,
      },
      { upsert: false }
    );
  }

  /** Inserts a course into database. */
  async saveOne(course: CourseType) {
    // Preprocess the course object
    course.course_code = course.course_code.toUpperCase();
    // Update if exists, insert if not exists
    await this.collection.updateOne(
      {
        course_code: course.course_code,
      },
      { $set: course },
      {
        upsert: true,
      }
    );
  }
}

export { Course };
