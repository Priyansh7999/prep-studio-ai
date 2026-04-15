"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold">
        Welcome to <span className="text-primary">PrepStudio AI</span>
      </h2>

      {!user ? (
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      ) : (
        <>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </>
      )}
    </div>
  );
}