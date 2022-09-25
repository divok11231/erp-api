import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Performance } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Performance | Error>) {
    try {
        const { grade, course, student } = req.body;
        const Performance = await prisma.performance.create({ data: { course: { connect: { code: course } }, student: { connect: { email: student } }, grade: grade } })
        res.status(201).json(Performance)
    } catch (e) {
        res.status(500)
        res.json({ message: `F in chat: ${e}` });

    }
}
