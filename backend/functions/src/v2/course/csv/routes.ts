import * as express from "express";
import { internalError } from "../../../common/utils";
import { postCourseCSV } from "./functions";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router({ mergeParams: true });

router.post("/", async (req: express.Request, res: express.Response) => {
	postCourseCSV(req, res).catch((err) => internalError(res, err));
});

export default router;
