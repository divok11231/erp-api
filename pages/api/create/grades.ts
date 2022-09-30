import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prof, Performance } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Performance | Error | null>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const prof = await prisma.prof.findUnique({ where: { id: session?.user?.email ? session?.user?.email : "" } })
        if (prof === null) { res.json({ message: 'feggit' }) }
        else {
            const { grade, course, student } = req.body;
            const courseFetched = await prisma.course.findUnique({ where: { code: course } })
            if (courseFetched === null) { res.json({ message: 'feggit' }) }


            const Performance = await prisma.performance.create({ data: { course: { connect: { code: course } }, student: { connect: { email: student } }, grade: grade, credits: courseFetched?.credits as number } })
            res.status(201).json(Performance)
        }
    } catch (e) {
        res.status(500)
        res.json({ message: `F in chat: ${e}` });

    }
}
