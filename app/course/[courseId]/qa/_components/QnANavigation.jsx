import { Button } from "@/components/ui/button";

function QnANavigation({
  stepCount,
  total,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex justify-between items-center mb-10">
      <Button
        variant="outline"
        disabled={stepCount === 0}
        onClick={onPrevious}
      >
        Previous
      </Button>

      <Button onClick={onNext}>
        {stepCount === total - 1
          ? "Finish"
          : "Next"}
      </Button>
    </div>
  );
}

export default QnANavigation;