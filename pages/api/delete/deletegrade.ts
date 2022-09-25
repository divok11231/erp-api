import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Performance } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Performance | Error>) {
    try {
        const { performanceid } = req.body;
        const Performance = await prisma.performance.delete({ where: { performanceid: performanceid } })
        res.status(201).json(Performance)
    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}