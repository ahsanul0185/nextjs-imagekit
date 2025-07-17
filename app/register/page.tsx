"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {


      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4">
    <div  className='w-full max-w-xl rounded-xl border border-gray-200/40 mx-auto my-60 p-5'>
      <h1 className='text-center font-bold text-3xl my-5'>Register</h1>
      <form onSubmit={handleSubmit}  className='mt-4 flex flex-col gap-4'>
        <input
          type="email"
          placeholder="Email"
          value={email}
           className='border border-gray-200/40 rounded-md px-3 py-2 w-full outline-0 focus:border-amber-600'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
           className='border border-gray-200/40 rounded-md px-3 py-2 w-full outline-0 focus:border-amber-600'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
           className='border border-gray-200/40 rounded-md px-3 py-2 w-full outline-0 focus:border-amber-600'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit"  className='px-3 py-2 w-full outline-0 bg-amber-600 rounded-md cursor-pointer hover:bg-amber-700'>Register</button>
      </form>

      <div className='flex justify-end text-sm mt-3'>
        <p>Already have an account? <Link href="/login" className='text-amber-600 hover:underline'>Login</Link></p>
      </div>
    </div>
    </div>
  );
}

export default RegisterPage;
