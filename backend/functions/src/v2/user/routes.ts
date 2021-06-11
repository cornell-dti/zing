import * as express from "express";
const router: express.Router = express.Router();
import { createGroupConfig, addOrUpdateSurvey, createUser } from "./functions";

router.post(
  "/add-group-config",
  async (req: express.Request, res: express.Response) => {
    const {
      userEmail,
      configName,
      size,
      overflow,
      studentIdentifier,
      rules,
    } = req.body;
    createGroupConfig(
      userEmail,
      configName,
      size,
      overflow,
      studentIdentifier,
      rules
    )
      .then(() =>
        res
          .status(200)
          .json({ success: `created config ${configName} for ${userEmail}` })
      )
      .catch((error) => {
        console.log(error);
        res.status(409).json({ error: error.message });
      });
  }
);

router.post(
  "/add-update-survey",
  async (req: express.Request, res: express.Response) => {
    const {
      groupId: courseId,
      fullName,
      studentId,
      identity,
      pronoun,
      graduation,
      college,
      remote,
      mode,
      time,
      start,
    } = req.body;

    addOrUpdateSurvey(
      courseId,
      fullName,
      studentId,
      identity,
      pronoun,
      graduation,
      college,
      remote,
      mode,
      time,
      start
    )
      .then(() =>
        res
          .status(200)
          .json({ success: `updated/added survey for ${fullName}` })
      )
      .catch((error) => {
        console.log(error);
        res.status(409).json({ error: error.message });
      });
  }
);

router.post("/create", async (req: express.Request, res: express.Response) => {
  const { email, name } = req.body;
  createUser(email, name)
    .then(() => res.status(200).json({ success: `created user ${name}` }))
    .catch((error) => {
      console.log(error);
      res.status(409).json({ error: error.message });
    });
});

export default router;
