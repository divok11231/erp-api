import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Student, Performance } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Performance | Student | Error | null>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const Student = await prisma.student.findUnique({ where: { email: session?.user?.email ? session?.user?.email : "" } })
        if (Student === null) { res.json({ message: 'auuuuugh' }) }
        else {
            const { Course } = req.body;
            const updateUser = await prisma.student.update({
                where: {
                    email: session?.user?.email ? session?.user?.email : "",
                },
                data: {
                    courses: { connect: { code: Course } },
                },
            })



            res.status(201).json(updateUser)
        }
    } catch (e) {
        res.status(500)
        res.json({ message: `F in chat: ${e}` });

    }
}
