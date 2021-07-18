import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";

const app = express();

// import all routers
import courseRoutes from "./v2/course/routes";
import instructorRoutes from "./v2/instructor/routes";
import devRoutes from "./dev/routes";

// Automatically allow cross-origin requests. NEED TO CHANGE.
app.use(cors({ origin: true }));

// allow for body parsing
app.use(express.json());

app.get("/test", (req, res) => res.send("yo"));

// set up routes
app.use("/course", courseRoutes);
app.use("/instructor", instructorRoutes);
app.use("/dev", devRoutes);

export const api = functions.https.onRequest(app);
