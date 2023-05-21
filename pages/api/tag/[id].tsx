import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";
export const deleteTag = async (id: string) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("time-leverage")
    .collection("tags")
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
    const data = await deleteTag(id as string);

    res.status(200).json("deleted");
  }
}
