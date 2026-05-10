import { Button } from "@/components/ui/button";
function QuizResult({ score, totalQuestions, feedback, retryQuiz, goToCoursePage,}) {
    return (
        <div className="max-w-3xl mx-auto px-5 py-20">
            <div className="border rounded-2xl shadow-lg p-10 text-center">
                <h2 className="text-4xl font-bold mb-5">
                    Quiz Completed 
                </h2>
                <p className="text-gray-500 text-lg mb-8">
                    Here is your final performance summary
                </p>
                <div className="bg-primary/10 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-3">
                        Your Score
                    </h2>
                    <h1 className="text-6xl font-bold text-primary">
                        {score}/{totalQuestions}
                    </h1>
                    <p className="mt-4 text-gray-600">
                        {Math.round((score / totalQuestions) * 100)}% Accuracy
                    </p>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        Feedback
                    </h2>
                    <p className="text-gray-700 leading-7">
                        {feedback}
                    </p>
                </div>
                <div className="flex justify-center gap-5">
                    <Button
                        variant="outline"
                        onClick={retryQuiz}
                    >
                        Retry Quiz
                    </Button>
                    <Button
                        onClick={goToCoursePage}
                    >
                        Back To Course
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default QuizResult;