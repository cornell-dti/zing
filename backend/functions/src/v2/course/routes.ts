import * as express from "express";
import { addCourse, connectGroupConfig } from "./functions";
import { Request, Response } from "express";

// eslint-disable-next-line new-cap
const router: express.Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
	const { name, minGroupSize, dueDate, userEmail } = req.body;
	addCourse(name, minGroupSize, dueDate, userEmail)
		.then(() =>
			res.status(200).send(`Successfully created a document for ${name}`)
		)
		.catch((error) => res.status(409).send(error));
});

router.post("/connect-config", async (req: Request, res: Response) => {
	const { userEmail, configName, courseId } = req.body;
	connectGroupConfig(userEmail, configName, courseId)
		.then(() =>
			res.status(200).send(`Successfully connected config for ${courseId}`)
		)
		.catch((error) => res.status(409).send(error));
});

export default router;
