"use client";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import apiClient from "@/utils/apiClient";

export const Header = () => {
  const { data: session, status } = useSession();

  const user = session?.user;
const handleLogout = async () => {
 await apiClient.delete('/logout')

  signOut({ callbackUrl: "/login" });
};

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-4 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out " />
          <span className="font-extrabold lg:text-xl  text-gray-900 ">
            TaskFlow
          </span>
        </Link>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <Link href="/#pricing">Pricing</Link>
        {status === "authenticated" && (
          <Link href="/dashboard">Your Summaries</Link>
        )}
      </div>

      <div className="flex lg:justify-end lg:flex-1 items-center gap-4">
        {status === "authenticated" ? (
          <>
            <Link href="/dashboard"> Organization</Link>
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"  
              />
            ) : (
              <img
                src={'/avatar.png'}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
};
