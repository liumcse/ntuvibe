import { exec } from "child_process";
import * as path from "path";
import * as fs from "fs";

/** Directory location of CLI. */
const CLI_DIRECTORY = path.join(__dirname, "./python");
/** File location of course content output. */
const COURSE_CONTENT_OUTPUT_LOCATION = path.join(
  __dirname,
  "./output/course_content.json"
);
/** File location of class schedule output. */
const CLASS_SCHEDULE_OUTPUT_LOCATION = path.join(
  __dirname,
  "./output/class_schedule.json"
);

function execCommandAsync(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/** Initialize by installing CLI. */
async function initialize() {
  // Install dependencies
  await execCommandAsync(`pip3 install ${CLI_DIRECTORY}`);
  // Create folder
  if (!fs.existsSync(path.join(__dirname, "./output"))) {
    fs.mkdirSync(path.join(__dirname, "./output"));
  }
}

/**
 * Returns course content in JSON format.
 * @param semester E.g. 2020_1 or 2020_2
 */
export async function scrapeCourseContent(semester?: string): Promise<object> {
  await initialize();
  await execCommandAsync(
    `scraper crawl course_content ${semester ? `--semester=${semester}` : ""}`
  );
  return new Promise((resolve, reject) => {
    fs.readFile(COURSE_CONTENT_OUTPUT_LOCATION, (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        resolve(JSON.parse(data.toString()));
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Returns class schedule in JSON format.
 * @param semester E.g. 2020_1 or 2020_2
 */
export async function scrapeClassSchedule(semester?: string): Promise<object> {
  await initialize();
  await execCommandAsync(
    `scraper crawl class_schedule ${semester ? `--semester=${semester}` : ""}`
  );
  return new Promise((resolve, reject) => {
    fs.readFile(CLASS_SCHEDULE_OUTPUT_LOCATION, (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        resolve(JSON.parse(data.toString()));
      } catch (err) {
        reject(err);
      }
    });
  });
}
