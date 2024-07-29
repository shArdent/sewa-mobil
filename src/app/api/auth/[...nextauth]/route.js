import prisma from "@/utils/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const user = await prisma.admin.findUnique({
          where: {
            username: username,
          },
        });

        console.log(username)
        console.log(password)
        console.log(user)
        if (user) {
          if (user.password === password) {
            return user;
          }
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }) {
      const { password, ...rest } = user || {};
      return { ...token, ...rest };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/TampilData/Transaksi";
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
