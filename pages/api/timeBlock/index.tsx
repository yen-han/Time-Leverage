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

export const getRangeTimeBlocks = async (
  start: string,
  end: string
): Promise<{}> => {
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db("time-leverage")
    .collection("time-blocks")
    .find({ date: { $gte: new Date(start), $lte: new Date(end) } })
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
  if (req.method === "GET") {
    if (req.query.start && req.query.end) {
      const data = await getRangeTimeBlocks(
        req.query.start as string,
        req.query.end as string
      );
      res.json({ timeBlocks: data });
    } else {
      const data = await getAllTimeBlocks(req.query.date as string);
      res.json({ timeBlocks: data });
    }
  } else if (req.method === "POST") {
    if (req.body) {
      const timeBlock = {
        userId: "0",
        title: req.body.TimeBlockTitle,
        desc: req.body.TimeBlockDesc,
        date: new Date(req.body.TimeBlockDate),
        start: new Date(req.body.TimeBlockStart),
        end: new Date(req.body.TimeBlockEnd),
        tags: JSON.parse(req.body.TimeBlockTags),
      };
      const insertedId = await createTimeBlock(timeBlock);
      res.status(200).json(insertedId);
    } else {
      res.status(400).json({ error: "name and industry are required." });
    }
  }
}
