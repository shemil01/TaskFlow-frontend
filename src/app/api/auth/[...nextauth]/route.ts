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
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const googleProfile = profile as {
          email: string;
          name: string;
          picture: string;
        };
        try {
          const res = await fetch("http://localhost:6499/api/google-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: googleProfile.email,
              name: googleProfile.name,
              avatar: googleProfile.picture,
            }),
          });

          const data = await res.json();
          token.userId = data.user._id;
        } catch (err) {
          console.error("Google user sync failed", err);
        }
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId  as string;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
