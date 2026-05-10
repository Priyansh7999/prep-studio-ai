"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
function FlashcardCompletion({ api,setIsCompleted,courseId}) {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <div className="w-87 h-105 rounded-3xl shadow-2xl border bg-white flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600">
          Completed
        </h2>
        <p className="text-gray-500 mt-4 leading-7">
          You have completed all flashcards successfully.
        </p>
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => {
              api?.scrollTo(0);
              setIsCompleted(false);
            }}
          >
            Revise Again
          </Button>
          <Button
            onClick={() =>
              router.push(`/course/${courseId}`)
            }
          >
            Back To Course
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardCompletion;