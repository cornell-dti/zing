import * as express from "express";
import { Request, Response } from "express";
import { postSurveyBatch } from "./functions";
import { internalError } from "../common/utils";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

router.post("/course/:courseId/", (req: Request, res: Response) => {
	postSurveyBatch(req, res).catch((err) => internalError(res, err));
});

export default router;
