import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { tag } from "@/components/Tag/Tag";
import { ObjectId } from "mongodb";
import NextCors from "nextjs-cors";
export const getAllTags = async (): Promise<{}> => {
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db("time-leverage")
    .collection("tags")
    .find({})
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

export const createTag = async (tag: tag): Promise<ObjectId> => {
  const mongoClient = await clientPromise;

  const response = await mongoClient
    .db("time-leverage")
    .collection("tags")
    .insertOne(tag);

  return response.insertedId;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await NextCors(req, res, {
  //   methods: ["GET", "POST"],
  //   origin: [
  //     "http://localhost:3000",
  //     "http://localhost:3001",
  //     "http://localhost:3002",
  //   ],
  //   optionsSuccessStatus: 200,
  // });
  console.log(req.body);
  if (req.method === "GET") {
    const data = await getAllTags();
    res.json({ tags: data });
  } else if (req.method === "POST") {
    if (req.body.title) {
      const tag: tag = {
        userId: "0",
        title: req.body.title,
        fontColor: "#000",
        bgColor: req.body.bgColor,
        iconClass: req.body.iconClass,
        iconPath: req.body.iconPath,
      };

      const insertedId = await createTag(tag);
      res.status(200).json(insertedId);
    } else {
      res.status(400).json({ error: "name and industry are required." });
    }
  }
}
