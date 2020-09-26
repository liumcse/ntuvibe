import { logger } from "../../../shared/logger";
import { Router, Request, Response } from "express";

/** Router instance. */
const courses = Router();

courses.get("/courses", (req: Request, res: Response) => {
  logger.info("Getting course list.");
});

export { courses };
