import { ClassScheduleType } from "./typings";
import { getDbInstance } from "../connections/connections";
import { Db, Collection } from "mongodb";

/** Model for class schedule. */
class ClassSchedule {
  private db: Db;
  private collection: Collection;

  constructor() {
    this.db = getDbInstance();
    this.collection = this.db.collection("classSchedules");
  }

  private async getClassSchedule(
    query: object
  ): Promise<ClassScheduleType | null> {
    const result = await this.collection.findOne<ClassScheduleType>(query, {
      projection: {
        course_code: 1,
        schedules: 1,
      },
    });
    if (!result) return null;
    return result;
  }

  /** Returns class schedule object with matching course code. */
  async getClassScheduleByCode(
    courseCode: string
  ): Promise<ClassScheduleType | null> {
    return await this.getClassSchedule({
      course_code: courseCode.toUpperCase(),
    });
  }

  /** Inserts a course into database. */
  async saveOneClassSchedule(classSchedule: ClassScheduleType) {
    // Preprocess the class schedule object
    classSchedule.course_code = classSchedule.course_code.toUpperCase();
    // Insert to db
    await this.collection.insertOne(classSchedule);
  }
}

export { ClassSchedule };
