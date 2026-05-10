function QuizFeedback({ isCorrect, correctAnswer }) {
    return (
        <>
            {isCorrect ? (
                <div className="mt-6 p-4 rounded-xl border border-green-500 bg-green-100">
                    <h2 className="font-bold text-green-700">
                        Correct Answer 
                    </h2>
                    <p className="text-green-700 mt-1">
                        Great job! Your answer is correct.
                    </p>
                </div>
            ) : (
                <div className="mt-6 p-4 rounded-xl border border-red-500 bg-red-100">
                    <h2 className="font-bold text-red-700">
                        Incorrect Answer
                    </h2>
                    <p className="text-red-700 mt-1">
                        Correct Answer:
                        <span className="font-semibold ml-2">
                            {correctAnswer}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
}
export default QuizFeedback;