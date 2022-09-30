import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prof, Course, Performance } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Error | Course | null>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const prof = await prisma.prof.findUnique({ where: { id: session?.user?.email ? session?.user?.email : "" } })
        if (prof === null) { res.json({ message: 'auuuuugh' }) }
        else {

            const { code, name, credits }: Course = req.body;
            const Course = await prisma.course.create({ data: { code: code, name: name, credits: credits } })
            res.status(201).json(Course)
        }
    } catch (e) {
        res.status(500)
        res.json({ message: `F in chat: ${e}` });

    }
}
