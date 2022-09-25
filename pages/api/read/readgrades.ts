import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Performance } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Performance[] | Error>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (session?.user?.email == "f20213127@hyderabad.bits-pilani.ac.in") {
            const Performance = await prisma.performance.findMany({ where: { studentid: session?.user?.email } });
            res.status(200)
            res.json(Performance);
        } else {
            res.status(403)
            res.json({ message: "fit mid, no bitches. UNAUTHORIZED" });
        }
    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}
