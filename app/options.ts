import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return `${baseUrl}/signup`
    },
    session: async ({ session, token, user, trigger, newSession }) => {

      prisma.$connect()
      const userAccount = await prisma.account.findFirst({
        where: {
          userId: user.id
        }
      })
      prisma.$disconnect()

      return {
        ...session,
        user: {
          ...session.user,
          accessToken: userAccount?.access_token
        },
      };
    },
  }
}