"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Navbar({ user }) {
    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="logo" width={38} height={38} />
                    <h1 className="text-2xl font-bold">PrepStudio AI</h1>
                </div>
                <div className="flex items-center gap-4">
                    {!user ? (
                        <Link href="/sign-in">
                            <Button variant="outline">
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/dashboard">
                            <Button>
                                Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;