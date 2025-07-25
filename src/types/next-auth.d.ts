import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    avatar: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken?: string;
      refreshToken?: string;
      avatar: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
    avatar: string;
  }
}
