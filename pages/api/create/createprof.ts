import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prof } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
  message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Prof | Error>) {
  try {
    const { name, email } = req.body;
    const prof = await prisma.prof.create({ data: { name: name, id: email } })
    res.status(201).json(prof)
  } catch (e) {
    res.status(500)
    res.json({ message: "F in chat" });

  }
}




