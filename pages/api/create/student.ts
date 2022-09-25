import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Student } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { type } from "os";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Student | Error>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const student = await prisma.student.findUnique({ where: { email: session?.user?.email } })

        if (student === null) {
            const { name, course, email } = req.body;
            const student = await prisma.student.create({ data: { courses: { connect: { code: course } }, name: session?.user?.name, email: session?.user?.email } })
            res.status(201).json(student)
        }

    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}


