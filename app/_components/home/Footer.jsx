"use client";

import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <h2 className="font-semibold">
            PrepStudio AI
          </h2>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Built for students to simplify studying and revision.
        </p>
        <Link
          href="https://github.com/Priyansh7999/prep-studio-ai"
          target="_blank"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
          <Github className="h-5 w-5" />

          <span>
            Github Repo
          </span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;