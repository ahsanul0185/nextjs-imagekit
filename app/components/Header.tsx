"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import profileImg from "@/public/profile.png";
import Image from "next/image";
import {Plus, SquarePlay} from "lucide-react"

function Header() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
   
    const handleClickOutside = (e : MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
  
    return () =>  document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  

  return (
    <header className="py-4 md:py-6 px-5 md:px-16 border-b border-b-gray-200/40 flex items-center justify-between">
      <nav>
            <Link href="/" className="flex items-center text-xl gap-1.5"><SquarePlay /> VideoKit</Link>
      </nav>

      <div ref={dropdownRef}  className="relative">
        {status === "authenticated" ? (
          <div className="flex items-center gap-8">
            <Link href="/upload" className="button-style flex items-center gap-1 py-1 text-sm"><Plus size={18} /> Upload</Link>
            <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="size-8 rounded-full overflow-hidden cursor-pointer"
          >
            <Image src={profileImg} alt="Profile" />
          </div>
          </div>
        ) : 
        status === "loading" ? null 
        : (
          <Link
            href="/login"
            className="bg-amber-600 px-3 py-2 rounded hover:bg-amber-700 duration-300"
          >
            Login
          </Link>
        )}

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-full translate-y-3 backdrop-blur-sm shadow-2xl rounded-xl w-64  right-0  bg-gray-500/30 border border-gray-200/40 p-5">
            <p className="line-clamp-1 text-sm pb-5">{session?.user.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="button-style text-sm w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
