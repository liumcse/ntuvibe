import { CourseType } from "./typings";
import { getDbInstance } from "../connections/connections";
import { Db, Collection } from "mongodb";

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
        as_ue: 1,
        as_pe: 1,
        grade_type: 1,
        semesters: 1,
        description: 1,
        last_update: 1,
        postgrad: 1,
      },
    });
    if (!result) return null;
    return result;
  }

  /**
   * Returns course object with matching course code.
   * @param courseCode
   */
  async getCourseByCode(courseCode: string): Promise<CourseType | null> {
    return await this.getCourse({ course_code: courseCode });
  }

  /** Returns an array of all courses. */
  async getAllCourses(): Promise<CourseType[]> {
    const projection = {
      course_code: 1,
      course_title: 1,
      au: 1,
      constraint: 1,
      as_ue: 1,
      as_pe: 1,
      grade_type: 1,
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

  /** Inserts a course into database. */
  async saveOneCourse(course: CourseType) {
    // Preprocess the course object
    course.course_code = course.course_code.toUpperCase();
    course.course_title = course.course_title.toUpperCase();
    // Insert to db
    await this.collection.insertOne(course);
  }
}

/** Modal for course. */
// const Course = mongoose.model<CourseType & mongoose.Document>(
//   "Course",
//   courseSchema
// );

export { Course };
