"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#62929e] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#f0f0f0]">
          Nocturna
        </Link>
        <ul className="flex items-center gap-6 text-m">
            <li>
              <a className="text-[#f0f0f0] transition hover:text-gray-500/75" href="#"> About </a>
            </li>

            <li>
              <a className="text-[#f0f0f0] transition hover:text-gray-500/75" href="#"> Services </a>
            </li>

          </ul>
        <div className="flex items-center gap-2">
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-[#f0f0f0] text-[#292929] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-[#f0f0f0] text-[#292929] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition duration-300"
            >
              Login
            </Link>
          )}
          <Link
              href="/register"
              className="bg-[#f0f0f0] text-[#292929] px-4 py-2 rounded-lg hover:bg-[#e0e0e0] transition duration-300"
            >
              SignUp
            </Link>
        </div>
      </div>
    </nav>
  );
}