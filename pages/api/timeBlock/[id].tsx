import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";

export const updateBlock = async (id: string, block: any) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("time-leverage")
    .collection("time-blocks")
    .replaceOne({ _id: new ObjectId(id) }, block);
};

export const deleteBlock = async (id: string) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("time-leverage")
    .collection("time-blocks")
    .deleteOne({ _id: new ObjectId(id) });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id!;
  if (req.method === "GET") {
  } else if (req.method === "PUT") {
    const block = {
      userId: "0",
      date: new Date(req.body.TimeBlockDate),
      start: new Date(req.body.TimeBlockStart),
      end: new Date(req.body.TimeBlockEnd),
      title: req.body.TimeBlockTitle,
      desc: req.body.TimeBlockDesc,
      tags: JSON.parse(req.body.TimeBlockTags),
    };
    const data = await updateBlock(id as string, block);
    res.status(200).json("succeeded");
  } else if (req.method === "DELETE") {
    const data = await deleteBlock(id as string);

    res.status(200).json("succeeded");
  }
}
