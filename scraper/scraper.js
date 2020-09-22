"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs = require("fs");
const connections_1 = require("../shared/db/connections/connections");
const course_1 = require("../shared/db/models/course");
const class_schedule_1 = require("../shared/db/models/class_schedule");
/** Directory location of CLI. */
const CLI_DIRECTORY = path.join(__dirname, "./python");
/** File location of course content output. */
const COURSE_CONTENT_OUTPUT_LOCATION = path.join(__dirname, "./output/course_content.json");
/** File location of class schedule output. */
const CLASS_SCHEDULE_OUTPUT_LOCATION = path.join(__dirname, "./output/class_schedule.json");
/** Map short form of day to number. */
const NUM_TO_DAY = {
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7,
};
/** Whether CLI is installed. */
let cliInstalled = false;
function execCommandAsync(command) {
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
/** Parse remark into weeks */
function getWeeksFromRemark(remark) {
    if (!remark) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }
    if (remark.includes("ONLINE")) {
        return [-1];
    }
    if (!remark.includes("Teaching Wk")) {
        return [];
    }
    const weeks = [];
    const remarkArr = remark.slice(11).split(",");
    for (let splitted of remarkArr) {
        const temp = splitted.split("-");
        if (temp.length === 1) {
            weeks.push(Number(temp[0]));
        }
        else if (temp.length === 2) {
            for (let i = Number(temp[0]); i <= Number(temp[1]); i++) {
                weeks.push(i);
            }
        }
        else {
            console.log("Wrong remark format", remark);
        }
    }
    return weeks;
}
/** Initialize by installing CLI. */
async function initialize() {
    if (cliInstalled)
        return;
    // Install dependencies
    await execCommandAsync(`cd ${CLI_DIRECTORY} && python3 setup.py install`);
    console.log("CLI installed.");
    // Create folder
    if (!fs.existsSync(path.join(__dirname, "./output"))) {
        fs.mkdirSync(path.join(__dirname, "./output"));
    }
    cliInstalled = true;
}
/**
 * Returns course content in JSON format.
 * @param semester E.g. 2020_1 or 2020_2
 */
async function scrapeCourseContent(semester) {
    await initialize();
    await execCommandAsync(`scraper crawl course_content ${semester ? `--semester=${semester}` : ""} --output_file=${COURSE_CONTENT_OUTPUT_LOCATION}`);
    return new Promise((resolve, reject) => {
        fs.readFile(COURSE_CONTENT_OUTPUT_LOCATION, (err, data) => {
            if (err) {
                reject(err);
            }
            try {
                resolve(JSON.parse(data.toString()));
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.scrapeCourseContent = scrapeCourseContent;
/**
 * Returns class schedule in JSON format.
 * @param semester E.g. 2020_1 or 2020_2
 */
async function scrapeClassSchedule(semester) {
    await initialize();
    await execCommandAsync(`scraper crawl class_schedule ${semester ? `--semester=${semester}` : ""} --output_file=${CLASS_SCHEDULE_OUTPUT_LOCATION}`);
    return new Promise((resolve, reject) => {
        fs.readFile(CLASS_SCHEDULE_OUTPUT_LOCATION, (err, data) => {
            if (err) {
                reject(err);
            }
            try {
                resolve(JSON.parse(data.toString()));
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.scrapeClassSchedule = scrapeClassSchedule;
async function taskCourseContent(semester) {
    console.log("Start scraping and saving course content");
    // Connect to DB
    await connections_1.connectToDb();
    // Scrape course content and adds to DB
    const scrapped = await scrapeCourseContent(semester);
    semester = scrapped["semester"];
    const data = scrapped["data"];
    const model = new course_1.Course();
    for (const entry of Object.entries(data)) {
        const courseCode = entry[0];
        const detail = entry[1];
        const course = {
            course_code: courseCode.toUpperCase(),
            au: Number(detail["au"]),
            course_title: detail["title"],
            description: detail["description"].trim(),
            constraint: {
                prerequisite: detail["prerequisite"] || [],
                na_to: (detail["na_to"] && detail["na_to"].split(", ")) || [],
                na_to_all: (detail["na_to_all"] && detail["na_to_all"].split(", ")) || [],
                mutex: (detail["mutex"] && detail["mutex"].split(", ")) || [],
            },
            semesters: [semester],
            last_update: new Date(),
            pass_fail: !!detail["grade_type"],
            postgrad: false,
        };
        // Check if the course already exists in DB
        const courseInDb = await model.getOneByCode(courseCode.toUpperCase());
        if (courseInDb) {
            // Update semester
            course["semesters"] = Array.from(new Set(courseInDb["semesters"].concat(semester).sort()));
            // Update instead of insert
        }
        // Insert into database
        await model.saveOne(course);
    }
    console.log("Done scraping and saving course content");
}
async function taskClassSchedule(semester) {
    console.log("Start scraping and saving class schedules");
    // Connect to DB
    await connections_1.connectToDb();
    // Scrape course content and adds to DB
    const scrapped = await scrapeClassSchedule(semester);
    semester = scrapped["semester"];
    const data = scrapped["data"];
    const model = new class_schedule_1.ClassSchedule();
    // Delete existing schedules, but do it after successful scrape
    model.deleteAll();
    for (const entry of Object.entries(data)) {
        const courseCode = entry[0];
        const detail = entry[1];
        const classSchedule = {
            course_code: courseCode.toUpperCase(),
            schedules: [],
        };
        for (const index of Object.keys(detail["indices"])) {
            for (const schedule of detail["indices"][index]) {
                classSchedule.schedules.push({
                    class_index: index,
                    class_type: schedule["type"],
                    class_group: schedule["group"],
                    start_time: schedule["time"].split("-")[0],
                    end_time: schedule["time"].split("-")[1],
                    venue: schedule["venue"],
                    day: NUM_TO_DAY[schedule["day"]],
                    weeks: getWeeksFromRemark(schedule["remark"]),
                });
            }
        }
        model.saveOneClassSchedule(classSchedule);
    }
    console.log("Done scraping and saving class schedules");
}
async function taskAdditionalInfo(semester) {
    console.log("Start scraping and saving additional info");
    // Connect to DB
    await connections_1.connectToDb();
    // Scrape course content and adds to DB
    const scrapped = await scrapeClassSchedule(semester);
    semester = scrapped["semester"];
    const data = scrapped["data"];
    const model = new course_1.Course();
    for (const entry of Object.entries(data)) {
        const courseCode = entry[0];
        const detail = entry[1];
        const title = detail["title"];
        const additionalInfo = {
            as_pe: title.includes("#"),
            as_ue: title.includes("*"),
        };
        await model.updateOne(courseCode, additionalInfo);
    }
    console.log("Done scraping and saving additional info");
}
async function main() {
    await taskCourseContent();
    await taskClassSchedule();
    await taskAdditionalInfo();
}
main();
