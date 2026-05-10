import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
function NotesProgress({ stepCount, notesLength, handleNext, handlePrevious,}) {
  return (
    <div className="sticky top-20 z-50 bg-white/90 backdrop-blur-md border rounded-2xl p-4 shadow-sm mb-8">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={stepCount === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="flex-1">
          <div className="flex justify-between mb-2 text-sm text-gray-500">
            <span>
              Chapter {stepCount + 1} of {notesLength}
            </span>
            <span>
              {Math.round(
                ((stepCount + 1) / notesLength) * 100
              )}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((stepCount + 1) / notesLength) * 100}%`,
              }}
            />
          </div>
        </div>
        <Button
          onClick={handleNext}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
export default NotesProgress;