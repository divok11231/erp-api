import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prof } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { type } from "os";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Prof | Error>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const prof = await prisma.prof.findUnique({ where: { id: session?.user?.email } })

        if (prof === null) {
            const { name, course, email } = req.body;
            const prof = await prisma.prof.create({ data: { name: session?.user?.name, id: session?.user?.email } })
            res.status(201).json(prof)
        }

    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}


