import { NextApiRequest, NextApiResponse } from "next";

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send("Hi!");
}
