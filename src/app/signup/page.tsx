"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Signup with backend
    const res = await fetch("http://localhost:6499/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    // ✅ Auto-login with NextAuth
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });

    if (loginRes?.ok) {
      router.push("/");
      alert("registration completed");
    } else {
      setError("Signup succeeded but login failed");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center text-black bg-gray-50 overflow-hidden">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-[504px] p-8 sm:p-12 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-6">Get Started Now</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={form.name}
              className="mt-1 p-2.5 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              required
              className="mt-1 p-2.5 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
              className="mt-1 p-2.5 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-500"
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
            className="w-full py-2.5 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Signup
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
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>
          <button className="border border-gray-500 rounded-md flex items-center px-4 py-2 space-x-2">
            <FaApple />
            <span className="text-sm font-medium">Sign up with Apple</span>
          </button>
        </div>

        <div className="mt-4 text-sm">
          Have an account?{" "}
          <Link href={"/login"} className="text-green-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
