import * as express from "express";
import { db, adminAuth } from "../../db";

const getUserDataFromRequest = async (
  request: express.Request
): Promise<
  { email: string | undefined; uid: string | undefined } | undefined
> => {
  const headers = request.headers;
  if (headers === undefined) return undefined;
  const idToken = headers["auth-token"];
  if (typeof idToken !== "string") return undefined;
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  return { email: decodedToken.email, uid: decodedToken.uid };
};

export const isAuthorized = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  const dataResponse = await getUserDataFromRequest(req);

  if (!dataResponse || !dataResponse.email || !dataResponse.uid)
    return res.status(440).json({ success: false, err: "Unauthorized" });

  // Check if user actually exists in our system
  if (!(await db.collection("userdata").doc(dataResponse.uid).get()).exists)
    return res.status(401).json({
      success: false,
      err: "This email is not registered.",
    });

  res.locals = { user: dataResponse };
  return next();
};
