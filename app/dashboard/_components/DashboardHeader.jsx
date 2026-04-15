"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const isDashboardRoute = pathname === "/dashboard";
  return (
    <div className={`p-5 sticky top-0 bg-white z-20 rounded-2xl m-3 shadow-lg border-b-2 border-slate-200 flex ${isDashboardRoute? "justify-end" :"justify-between"} items-center`}>
      {!isDashboardRoute && (
        <div className="flex items-center space-x-2">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <Link href={"/dashboard"}>
            <span className="text-xl md:text-2xl font-bold">PrepStudio AI</span>
          </Link>
        </div>
      )}

      {/* User Button */}
      <UserButton />
    </div>
  )
}
