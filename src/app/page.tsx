"use client";
import BgGradient from "@/components/common/BgGradient";
import HeroSection from "@/components/home/HeroSection";
import apiClient from "@/utils/apiClient";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const syncGoogleUser = async () => {
      const session = await getSession();
      if (session?.user?.email) {
       
        await apiClient.post("google-auth", {
          email: session.user.email,
          name: session.user.name,
          avatar: session.user.image,
        });
      }
    };
    syncGoogleUser();
  }, []);
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col w-full">
        <HeroSection />
      </div>
    </div>
  );
}
