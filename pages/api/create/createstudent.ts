import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Student } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Student | Error>) {
    try {

        {
            const { name, course, email } = req.body;
            const student = await prisma.student.create({ data: { courses: { connect: { code: course } }, name: name, email: email } })
            res.status(201).json(student)
        }

    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}

