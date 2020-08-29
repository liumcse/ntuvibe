import { Course } from "./course";
import { connectToDb, getDbInstance } from "../connections/connections";
import { CourseType } from "./typings";
import { Db } from "mongodb";

describe("Course", () => {
  let course: Course;
  let db: Db;

  beforeAll(async () => {
    await connectToDb(process.env.MONGO_URI);
    db = getDbInstance();
    course = new Course();
  });

  beforeEach(async () => {
    await db.collection("courses").deleteMany({});
  });

  afterEach(async () => {
    await db.collection("courses").deleteMany({});
  });

  it("should be able to save course", async () => {
    const testDate = new Date();
    const testCourse: CourseType = {
      course_code: "CZ2001",
      course_title: "Algorithms",
      description: "Placeholder description",
      au: 3,
      constraint: {
        prerequisite: ["CZ1003"],
        na_to: ["BIZ"],
        na_to_all: ["SMT"],
        mutex: "BIUBIUBIU",
      },
      as_ue: true,
      as_pe: true,
      grade_type: true,
      semesters: ["2019_2"],
      last_update: testDate,
      postgrad: false,
    };
    await course.saveOneCourse(testCourse);
    const response = await db
      .collection("courses")
      .findOne({ course_code: "CZ2001" });
    (testCourse as any)["_id"] = response["_id"];
    expect(response).toEqual(testCourse);
  });

  it("should be able to get course by code", async () => {
    const testDate = new Date();
    const testCourse: CourseType = {
      course_code: "CZ2001",
      course_title: "Algorithms",
      description: "Placeholder description",
      au: 3,
      constraint: {
        prerequisite: ["CZ1003"],
        na_to: ["BIZ"],
        na_to_all: ["SMT"],
        mutex: "BIUBIUBIU",
      },
      as_ue: true,
      as_pe: true,
      grade_type: true,
      semesters: ["2019_2"],
      last_update: testDate,
      postgrad: false,
    };
    await db.collection("courses").insertOne(testCourse);
    const response = await course.getCourseByCode("CZ2001");
    expect(response).toEqual(testCourse);
  });

  it("should be able to get all courses available", async () => {
    const testDate = new Date();
    const testCourses: CourseType[] = [
      {
        course_code: "CZ2001",
        course_title: "Algorithms",
        description: "Placeholder description",
        au: 3,
        constraint: {
          prerequisite: ["CZ1003"],
          na_to: ["BIZ"],
          na_to_all: ["SMT"],
          mutex: "BIUBIUBIU",
        },
        as_ue: true,
        as_pe: true,
        grade_type: true,
        semesters: ["2019_2"],
        last_update: testDate,
        postgrad: false,
      },
      {
        course_code: "CZ2002",
        course_title: "OOP",
        description: "Placeholder description",
        au: 3,
        constraint: {
          prerequisite: ["CZ1003"],
          na_to: ["BIZ"],
          na_to_all: ["SMT"],
          mutex: "BIUBIUBIU",
        },
        as_ue: true,
        as_pe: true,
        grade_type: true,
        semesters: ["2019_1"],
        last_update: testDate,
        postgrad: false,
      },
    ];
    await db.collection("courses").insertMany(testCourses);
    const response = await course.getAllCourses();
    expect(response).toEqual(testCourses);
  });
});
