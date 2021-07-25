import * as express from "express";
import { Request, Response } from "express";
import { getSurvey, postSurvey, getSurveyResponse } from "./functions";
import { internalError } from "../../../common/utils";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router({ mergeParams: true });

router
	.get("/", (req: Request, res: Response) => {
		getSurvey(req, res).catch((err) => internalError(res, err));
	})
	.post("/", (req: Request, res: Response) => {
		postSurvey(req, res).catch((err) => internalError(res, err));
	});

router.get("/:email", (req: Request, res: Response) => {
	getSurveyResponse(req, res).catch((err) => internalError(res, err));
});

export default router;
