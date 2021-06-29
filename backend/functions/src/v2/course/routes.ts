import * as express from "express";
import {
	postCourse,
	patchCourse,
	deleteCourse,
	getCourse,
	groupCourse,
} from "./functions";
import { Request, Response } from "express";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router();
const internalError = (res: Response, err: any) =>
	res.status(500).send(err.toString());

router.post("/", (req: Request, res: Response) => {
	postCourse(req, res).catch((err) => internalError(res, err));
});

router
	.get("/:courseDocId", async (req: Request, res: Response) => {
		getCourse(req, res).catch((err) => internalError(res, err));
	})
	.delete("/:courseDocId", async (req: Request, res: Response) => {
		deleteCourse(req, res).catch((err) => internalError(res, err));
	})
	.patch("/:courseDocId", async (req: Request, res: Response) => {
		patchCourse(req, res).catch((err) => internalError(res, err));
	});

router.post("/:courseDocId/group", async (req: Request, res: Response) => {
	groupCourse(req, res).catch((err) => internalError(res, err));
});

export default router;
