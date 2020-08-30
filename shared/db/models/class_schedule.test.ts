import { ClassSchedule } from "./class_schedule";
import { Db } from "mongodb";
import { connectToDb, getDbInstance } from "../connections/connections";
import { ClassScheduleType } from "./typings";

describe("ClassSchedule", () => {
  let classSchedule: ClassSchedule;
  let db: Db;

  beforeAll(async () => {
    await connectToDb(process.env.MONGO_URI);
    db = getDbInstance();
    classSchedule = new ClassSchedule();
  });

  beforeEach(async () => {
    await db.collection("classSchedules").deleteMany({});
  });

  afterEach(async () => {
    await db.collection("classSchedules").deleteMany({});
  });

  it("should be able to save one class schedule", async () => {
    const testClassSchedule: ClassScheduleType = {
      course_code: "CZ2001",
      schedules: [
        {
          class_index: "123456",
          class_type: "UE",
          class_group: "233",
          start_time: "123456",
          end_time: "123456",
          venue: "Hive",
          day: 1,
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          class_index: "23435",
          class_type: "UE",
          class_group: "111",
          start_time: "42535324",
          end_time: "123423356",
          venue: "Wave",
          day: 2,
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
    };
    await classSchedule.saveOneClassSchedule(testClassSchedule);
    const response = await db
      .collection("classSchedules")
      .findOne({ course_code: "CZ2001" });
    expect(response).toEqual(testClassSchedule);
  });

  it("should be able to get class schedule by code", async () => {
    const testClassSchedule: ClassScheduleType = {
      course_code: "CZ2001",
      schedules: [
        {
          class_index: "123456",
          class_type: "UE",
          class_group: "233",
          start_time: "123456",
          end_time: "123456",
          venue: "Hive",
          day: 1,
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          class_index: "23435",
          class_type: "UE",
          class_group: "111",
          start_time: "42535324",
          end_time: "123423356",
          venue: "Wave",
          day: 2,
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
    };
    await db.collection("classSchedules").insertOne(testClassSchedule);
    const response = await classSchedule.getClassScheduleByCode("CZ2001");
    expect(response).toEqual(testClassSchedule);
  });
});
