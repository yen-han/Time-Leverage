import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";

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
  } else if (req.method === "DELETE") {
    const data = await deleteBlock(id as string);

    res.status(200).json("succeeded");
  }
}
