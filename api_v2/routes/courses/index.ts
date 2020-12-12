import { logger } from "../../../shared/logger";
import { Router, Request, Response } from "express";
import {
  getCourseDetailByCourseCode,
  getAllCourseSnippet,
  getCourseSnippetByRegex,
} from "../../models/course";

/** Router instance. */
const courses = Router();

courses.get("/course/all", async (req: Request, res: Response) => {
  logger.info("Getting course list.");
  // await connectToDb();
  logger.info("Connected to DB.");
  // const course = new Course();
  const courseList = await getAllCourseSnippet();
  return res.json(courseList);
});

courses.get("/course/search", async (req: Request, res: Response) => {
  const { query } = req.query;
  logger.info(`Searching for ${query}`);
  const searchResult = await getCourseSnippetByRegex(query as string);
  return res.json(searchResult);
});

courses.get("/course/:course_code", async (req: Request, res: Response) => {
  const courseCode = req.params.course_code.toUpperCase();
  logger.info(`Getting course detail for ${courseCode}`);
  const courseDetail = await getCourseDetailByCourseCode(courseCode);
  return res.json(courseDetail);
});

export { courses };
