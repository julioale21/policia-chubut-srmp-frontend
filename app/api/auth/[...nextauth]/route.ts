import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handle = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text", placeholder: "jsmith" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();

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
