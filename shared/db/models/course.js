"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections_1 = require("../connections/connections");
/** Model for course. */
class Course {
    constructor() {
        this.db = connections_1.getDbInstance();
        this.collection = this.db.collection("courses");
    }
    async getCourse(query) {
        const result = await this.collection.findOne(query, {
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
        if (!result)
            return null;
        return result;
    }
    /** Returns course object with matching course code. */
    async getOneByCode(courseCode) {
        return await this.getCourse({ course_code: courseCode.toUpperCase() });
    }
    /** Returns an array of all courses. */
    async getAll() {
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
            .aggregate([
            {
                $project: projection,
            },
        ])
            .toArray();
    }
    /** Update a course. */
    async updateOne(courseCode, fields) {
        courseCode = courseCode.toUpperCase();
        await this.collection.updateOne({
            course_code: courseCode,
        }, {
            $set: fields,
        }, { upsert: false });
    }
    /** Inserts a course into database. */
    async saveOne(course) {
        // Preprocess the course object
        course.course_code = course.course_code.toUpperCase();
        // Update if exists, insert if not exists
        await this.collection.updateOne({
            course_code: course.course_code,
        }, { $set: course }, {
            upsert: true,
        });
    }
}
exports.Course = Course;
