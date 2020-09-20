"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs = require("fs");
/** Directory location of CLI. */
const CLI_DIRECTORY = path.join(__dirname, "./python");
/** File location of course content output. */
const COURSE_CONTENT_OUTPUT_LOCATION = path.join(__dirname, "./output/course_content.json");
/** File location of class schedule output. */
const CLASS_SCHEDULE_OUTPUT_LOCATION = path.join(__dirname, "./output/class_schedule.json");
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
/** Initialize by installing CLI. */
async function initialize() {
    // Install dependencies
    await execCommandAsync(`cd ${CLI_DIRECTORY} && apt-get install python3-setuptools && python3 setup.py install`);
    console.log("CLI installed.");
    // Create folder
    if (!fs.existsSync(path.join(__dirname, "./output"))) {
        fs.mkdirSync(path.join(__dirname, "./output"));
    }
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
scrapeCourseContent().then((x) => console.log(x));
//# sourceMappingURL=scraper.js.map