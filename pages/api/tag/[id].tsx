import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";

export const updateTag = async (id: string, tag: any) => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db("time-leverage")
    .collection("tags")
    .replaceOne({ _id: new ObjectId(id) }, tag);
};

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
    const tag = {
      userId: "0",
      title: req.body.title,
      fontColor: "#000",
      bgColor: req.body.bgColor,
      iconClass: req.body.iconClass,
      iconPath: req.body.iconPath,
    };
    const data = await updateTag(id as string, tag);
    res.status(200).json("succeeded");
  } else if (req.method === "DELETE") {
    const data = await deleteTag(id as string);

    res.status(200).json("succeeded");
  }
}
