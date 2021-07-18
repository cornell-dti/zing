import * as express from "express";
import { postCourse, patchCourse, deleteCourse, getCourse } from "./functions";
import { Request, Response } from "express";
import { internalError } from "../../common/utils";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

router.post("/", (req: Request, res: Response) => {
	postCourse(req, res).catch((err) => internalError(res, err));
});

router
	.get("/:courseId", async (req: Request, res: Response) => {
		getCourse(req, res).catch((err) => internalError(res, err));
	})
	.delete("/:courseId", async (req: Request, res: Response) => {
		deleteCourse(req, res).catch((err) => internalError(res, err));
	})
	.patch("/:courseId", async (req: Request, res: Response) => {
		patchCourse(req, res).catch((err) => internalError(res, err));
	});

import csvRouter from "./csv/routes";
import surveyRouter from "./survey/routes";
import groupRouter from "./group/routes";

router.use("/:courseId/csv", csvRouter);
router.use("/:courseId/survey", surveyRouter);
router.use("/:courseId/group", groupRouter);

export default router;
