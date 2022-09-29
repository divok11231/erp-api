import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-auth";
import { PrismaClient, Student } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next"

import { type } from "os";
const prisma = new PrismaClient({ log: ["query"] });


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Check if email is prof or student
            // Check if user already exists
            const studentRegex = /f\d+@hyderabad\.bits-pilani\.ac\.in/g
            const profRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@hyderabad\.bits-pilani\.ac\.in/g
            if (studentRegex.test(session?.user?.email as string)) {
                const student = await prisma.student.findUnique({ where: { email: session?.user?.email ? session?.user?.email : "" } })

                if (student === null) {
                    const student = await prisma.student.create({
                        data: {
                            name: session?.user?.name ? session?.user?.name : "",
                            email: session?.user?.email ? session?.user?.email : ""
                        }
                    })
                }
                return session // The return type will match the one returned in `useSession()`
            }
            if (profRegex.test(session?.user?.email as string)) {
                const prof = await prisma.prof.findUnique({ where: { id: session?.user?.email ? session?.user?.email : "" } })

                if (prof === null) {
                    const prof = await prisma.prof.create({
                        data: {
                            name: session?.user?.name ? session?.user?.name : "",
                            id: session?.user?.email ? session?.user?.email : ""
                        }
                    })
                }
                return session // The return type will match the one returned in `useSession()`
            }

            const fakeSession: Session = {
                cbt: "",
                expires: "",
            }
            return fakeSession
        },
    },

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.


        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },




}

export default NextAuth(authOptions)