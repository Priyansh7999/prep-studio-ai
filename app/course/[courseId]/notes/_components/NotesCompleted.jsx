import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
function NotesCompleted({ courseId, router, setStepCount}) {
  return (
    <div className="max-w-3xl mx-auto px-5 py-20">
      <div className="border rounded-3xl shadow-lg p-10 text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">
          Notes Completed 
        </h2>
        <p className="text-gray-600 text-lg leading-8 mb-10">
          You have successfully completed all chapters.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setStepCount(0)}
          >
            Revise Again
          </Button>
          <Button
            onClick={() => router.push(`/course/${courseId}`)}
          >
            Back To Course
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NotesCompleted;