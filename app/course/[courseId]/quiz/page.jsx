"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QuizCardItem from "./_components/QuizCardItem";
import QuizFeedback from "./_components/QuizFeedback";
import QuizResult from "./_components/QuizResult";
import QuizHeader from "./_components/QuizHeader";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
function Quiz() {
    const { courseId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [lockedQuestions, setLockedQuestions] = useState({});
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        GetQuiz();
    }, []);

    const GetQuiz = async () => {
        try {
            setIsLoading(true);
            const result = await axios.get(
                `/api/study-type?courseId=${courseId}&type=quiz`
            );
            setQuiz(result?.data?.quiz?.[0]?.content || []);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            toast.error("Failed to load quiz");
        } finally {
            setIsLoading(false);
        }
    };
    const currentQuestion = quiz[stepCount];

    const checkAnswer = (userAnswer) => {
        if (lockedQuestions[stepCount]) return;
        const isCorrect = userAnswer === currentQuestion?.answer;
        setSelectedAnswers((prev) => ({
            ...prev,
            [stepCount]: {
                selected: userAnswer,
                correct: isCorrect,
            },
        }));
        setLockedQuestions((prev) => ({
            ...prev,
            [stepCount]: true,
        }));

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (stepCount < quiz.length - 1) {
            setStepCount((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount((prev) => prev - 1);
        }
    };

    const handleFinishQuiz = () => {
        setShowResult(true);
    };

    const goToCoursePage = () => {
        toast.success(`Quiz Completed! Score: ${score}/${quiz.length}`);
        router.push(`/course/${courseId}`);
    };

    const getFeedback = () => {
        const percentage = (score / quiz.length) * 100;
        if (percentage >= 80) {
            return "Excellent Performance! You have a very strong understanding of this topic.";
        }
        if (percentage >= 60) {
            return "Good Job! Your concepts are clear, but there is still room for improvement.";
        }
        if (percentage >= 40) {
            return "Average Performance. Try revising the weak concepts and practice more.";
        }
        return "Needs Improvement. Go through the notes again and retry the quiz.";
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-10 w-10" />
            </div>
        );
    }

    if (showResult) {
        return (
            <QuizResult
                score={score}
                totalQuestions={quiz.length}
                feedback={getFeedback()}
                retryQuiz={() => window.location.reload()}
                goToCoursePage={goToCoursePage}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-5 py-10">
           <QuizHeader />
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold text-lg">
                    Score: {score}/{quiz.length}
                </h2>
                <h2 className="text-gray-500">
                    Question {stepCount + 1} / {quiz.length}
                </h2>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-10">
                <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{
                        width: `${((stepCount + 1) / quiz.length) * 100}%`,
                    }}
                />
            </div>
            <div className="flex justify-between items-center mb-8">
                <Button
                    variant="outline"
                    disabled={stepCount === 0}
                    onClick={handlePrevious}
                >
                    Previous
                </Button>
                {stepCount === quiz.length - 1 ? (
                    <Button
                        onClick={handleFinishQuiz}
                        disabled={!lockedQuestions[stepCount]}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Finish Quiz
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!lockedQuestions[stepCount]}
                    >
                        Next
                    </Button>
                )}
            </div>
            {quiz.length > 0 ? (
                <div>
                    <QuizCardItem
                        quiz={currentQuestion}
                        userSelectedOption={checkAnswer}
                        selectedOption={selectedAnswers[stepCount]?.selected}
                        locked={lockedQuestions[stepCount]}
                    />
                    {lockedQuestions[stepCount] && (
                        <QuizFeedback
                            isCorrect={
                                selectedAnswers[stepCount]?.correct
                            }
                            correctAnswer={currentQuestion?.answer}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center h-75">
                    <p className="text-gray-500 text-lg">
                        No quiz found.
                    </p>
                </div>
            )}
        </div>
    );
}
export default Quiz;