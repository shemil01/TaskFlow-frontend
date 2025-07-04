import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔥 Running authorize function...");

        const res = await fetch("http://localhost:6499/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        console.log("✅ AUTH RESPONSE:", data);

        if (data.accessToken) {
          return {
            id: data.user._id,
            email: data.user.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        }

        console.log("❌ Login failed", res.status, data);
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.userId as string;
    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    return session;
  },
}
,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
