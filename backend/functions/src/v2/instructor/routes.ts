import * as express from "express";
import { Request, Response } from "express";
import { postInstructor, getInstructorCourse } from "./functions";
import { internalError } from "../../common/utils";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

router.post("/", (req: Request, res: Response) => {
	postInstructor(req, res).catch((err) => internalError(res, err));
});

router.get("/:userId/course", (req: Request, res: Response) => {
	getInstructorCourse(req, res).catch((err) => internalError(res, err));
});

export default router;
