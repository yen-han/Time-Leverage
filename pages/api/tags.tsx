import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";

export const getAllTags = async (): Promise<{}> => {
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db("time-leverage")
    .collection("tags")
    .find({})
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getAllTags();
  res.json({ tags: data });
}
