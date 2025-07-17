"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Login() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
        const router = useRouter();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {email, password, redirect : false})

        if (result?.error) {
            console.log(result.error)
        }else{
            router.push("/")
        }
    }

  return (
    <div className='px-4'>
    <div className='w-full max-w-xl rounded-xl border border-gray-200/40 mx-auto my-60 p-5'>
        <h1 className='text-center font-bold text-3xl my-5'>Login</h1>
      <form onSubmit={handleSubmit} className='mt-4 flex flex-col gap-4'>
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
        <button type="submit" className='px-3 py-2 w-full outline-0 bg-amber-600 rounded-md cursor-pointer hover:bg-amber-700'>Login</button>
      </form>

      <div className='flex justify-end text-sm mt-3'>
        <p>Don&apos;t have an account? <Link href="/register" className='text-amber-600 hover:underline'>Register</Link></p>
      </div>
        
    </div>
    </div>
  )
}

export default Login