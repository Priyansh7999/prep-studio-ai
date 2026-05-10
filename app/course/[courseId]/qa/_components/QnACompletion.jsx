"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function QnACompletion({
  courseId,
  onRestart,
}) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center py-10">

      <div
        className="
        w-full
        max-w-100
        bg-white
        border
        shadow-2xl
        rounded-3xl
        p-10
        text-center
      "
      >
        <div className="text-6xl mb-5">
          🎉
        </div>

        <h2 className="text-3xl font-bold text-green-600">
          Q&A Completed
        </h2>

        <p className="text-gray-500 mt-4 leading-7">
          You have completed all important
          questions and answers successfully.
        </p>

        <div className="flex gap-4 justify-center mt-8">

          <Button
            variant="outline"
            onClick={onRestart}
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

export default QnACompletion;