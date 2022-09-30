import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Performance, Course } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

interface cock {
    coursePerformance: Performance[]
    cg: number

}

export default async function api(req: NextApiRequest, res: NextApiResponse<cock | Error>) {
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        const student = await prisma.student.findUnique({ where: { email: session?.user?.email ? session?.user?.email : "" } })
        if (student !== null) {
            const Performance = await prisma.performance.findMany({ where: { studentid: session?.user?.email ? session?.user?.email : "" } });

            let gradePoint = 0;
            let credits = 0;
            for (let i = 0; i < Performance.length; i++) {
                switch (Performance[i].grade) {
                    case "E":
                        gradePoint += 2 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "D":
                        gradePoint += 4 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "C-":
                        gradePoint += 5 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "C":
                        gradePoint += 6 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "B-":
                        gradePoint += 7 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "B":
                        gradePoint += 8 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "A-":
                        gradePoint += 9 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                    case "A":
                        gradePoint += 10 * Performance[i].credits;
                        credits += Performance[i].credits;
                        break;
                }
            }

            const cg: cock = {
                coursePerformance: Performance,
                cg: gradePoint / credits
            }


            res.status(200)
            res.json(cg);
        } else {
            res.status(403)
            res.json({ message: "fit mid, no bitches. UNAUTHORIZED" });
        }
    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}
