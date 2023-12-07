import axiosInstance from "@/app/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handle = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text"},
        password: { type: "password"},
      },
      async authorize(credentials, req) {
        const resp = await axiosInstance.post("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });

        const { data } = resp;

        if (data.user) {
          return {
            ...data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },

    async session({ session, token }) {
      session = { ...session, ...token };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handle as GET, handle as POST };
