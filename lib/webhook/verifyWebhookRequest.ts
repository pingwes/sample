import { NextApiRequest, NextApiResponse } from "next";
import { Logger } from "tslog";

const logger = new Logger({
  name: "lib/auth/verifyWebhookRequest",
});

export default function verifyWebhookRequest(
  req: NextApiRequest,
  res: NextApiResponse
): boolean {
  const secret = req.headers["x-secret"];
  if (secret === undefined || secret !== process.env.WEBHOOK_SECRET) {
    logger.warn("unauthorized, attempted secret", secret);
    res.status(401).send("Unauthorized");
    return false;
  } else {
    return true;
  }
}
