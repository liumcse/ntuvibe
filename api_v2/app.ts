// import "module-alias/register";
import * as express from "express";
import * as cors from "cors";
import * as routes from "./routes";
import { logger } from "../shared/logger";

const app = express();
const port = process.env.PORT || 3000;

// Add middleware
app.use(cors());
app.use(routes.courses);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
