import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import AccessToken from "../../interfaces/AccessToken";

export default async function verifyJwt(
  req: NextApiRequest,
  res?: NextApiResponse,
  panic: boolean = true
): Promise<AccessToken | undefined> {
  const jwt = req.headers.authorization?.split(" ")[1];
  try {
    const claims = verify(jwt as string, process.env.JWT_SECRET!, {
      ignoreExpiration: false,
    }) as any;
    return claims;
  } catch (err) {
    if (panic && res) {
      res.status(401).send("Invalid JWT");
    }
    return undefined;
  }
}
