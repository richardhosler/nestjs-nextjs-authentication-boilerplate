"use client";

import Image from "next/image";
import Link from "next/link";

export function Header(): JSX.Element {
  return (
    <>
      <nav className="flex top-0 min-w-full bg-gray-800 text-gray-100">
        <div className="flex mx-auto p-4 justify-around">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Authentication
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
