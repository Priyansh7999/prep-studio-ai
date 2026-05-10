"use client";
import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-10 w-10" />
    </div>
  );
}

export default Loading;