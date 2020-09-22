"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections_1 = require("../connections/connections");
/** Model for class schedule. */
class ClassSchedule {
    constructor() {
        this.db = connections_1.getDbInstance();
        this.collection = this.db.collection("classSchedules");
    }
    async getClassSchedule(query) {
        const result = await this.collection.findOne(query, {
            projection: {
                course_code: 1,
                schedules: 1,
            },
        });
        if (!result)
            return null;
        return result;
    }
    /** Returns class schedule object with matching course code. */
    async getClassScheduleByCode(courseCode) {
        return await this.getClassSchedule({
            course_code: courseCode.toUpperCase(),
        });
    }
    /** Deletes all class schedules. */
    async deleteAll() {
        await this.collection.deleteMany({});
    }
    /** Inserts a course into database. */
    async saveOneClassSchedule(classSchedule) {
        // Preprocess the class schedule object
        classSchedule.course_code = classSchedule.course_code.toUpperCase();
        // Insert to db
        await this.collection.insertOne(classSchedule);
    }
}
exports.ClassSchedule = ClassSchedule;
