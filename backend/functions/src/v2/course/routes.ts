import * as express from "express";
const router: express.Router = express.Router();
import { addCourse, connectGroupConfig } from "./functions";

router.post("/add", async (req: express.Request, res: express.Response) => {
	const { name, minGroupSize, dueDate, userEmail } = req.body;
	addCourse(name, minGroupSize, dueDate, userEmail)
		.then(() =>
			res.status(200).send(`Successfully created a document for ${name}`)
		)
		.catch((error) => res.status(409).send(error));
});

router.post(
	"/connect-config",
	async (req: express.Request, res: express.Response) => {
		const { userEmail, configName, courseId } = req.body;
		connectGroupConfig(userEmail, configName, courseId)
			.then(() =>
				res.status(200).send(`Successfully connected config for ${courseId}`)
			)
			.catch((error) => res.status(409).send(error));
	}
);

export default router;
