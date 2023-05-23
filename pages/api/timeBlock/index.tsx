import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";

export const getAllTimeBlocks = async (date: string): Promise<{}> => {
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db("time-leverage")
    .collection("time-blocks")
    .find({ date: new Date(date) })
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

export const createTimeBlock = async (timeBlock: any): Promise<ObjectId> => {
  const mongoClient = await clientPromise;

  const response = await mongoClient
    .db("time-leverage")
    .collection("time-blocks")
    .insertOne(timeBlock);

  return response.insertedId;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log(req.query.date);
  if (req.method === "GET" && req.query.date) {
    const data = await getAllTimeBlocks(req.query.date as string);

    res.json({ tags: data });
  } else if (req.method === "POST") {
    if (req.body) {
      console.log(req.body);
      const timeBlock = {
        userId: "0",
        title: req.body.TimeBlockTitle,
        desc: req.body.TimeBlockDesc,
        date: new Date(req.body.TimeBlockDate),
        start: new Date(req.body.TimeBlockStart),
        end: new Date(req.body.TimeBlockEnd),
        tags: JSON.parse(req.body.TimeBlockTags),
      };
      //   console.log(timeBlock);
      const insertedId = await createTimeBlock(timeBlock);
      res.status(200).json(insertedId);
    } else {
      res.status(400).json({ error: "name and industry are required." });
    }
  }
}
