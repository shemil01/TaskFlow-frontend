"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);
    if (res?.ok) {
      toast.success("Login successfull");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
    console.log("res:", res);
  };

  return (
    <div className="flex h-screen justify-center bg-gray-50 text-black">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center space-y-5 w-full max-w-[504px] p-8 sm:p-12 lg:w-1/2">
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <h1 className="text-2xl font-bold"> Welcome back!</h1>
            <p>Enter your Credentials to access your account</p>
            <label className="block text-sm mt-6 font-medium">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 px-2 text-xs  py-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="mt-1 px-2 py-2 text-xs w-full border rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              I agree to the terms & policy
            </label>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center w-full py-2.5 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}{" "}
          </button>
        </form>

        <div className="my-4 text-gray-500 text-sm">OR</div>

        {/* Social Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="border border-gray-500 rounded-md flex items-center px-4 py-2 space-x-2"
          >
            <FcGoogle />
            <span className="text-sm font-medium">sign up with Google</span>
          </button>
          <button className="border border-gray-500 rounded-md flex items-center px-4 py-2 space-x-2">
            <FaApple className="text-xl" />
            <span className="text-sm font-medium">Sign up with Apple</span>
          </button>
        </div>

        <div className="mt-4 text-sm">
          Don&apos;t Have an account?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
