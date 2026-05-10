import { useState } from "react";

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-10 p-5">
      <h2 className="font-bold  text-3xl text-center mb-5">{quiz?.question}</h2>
      <div className="grid grid-cols-2 gap-5 mt-8">
        {quiz?.options?.map((option, index) => (
          <h2
            onClick={() => {
              setSelectedOption(option);
              userSelectedOption(option);
            }}
            key={index}
            variant="outline"
            size="sm"
            className={`${
              selectedOption === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            } py-2 rounded-lg text-center cursor-pointer`}
          >
            {option}
          </h2>
        ))}
      </div>
    </div>
  );
}
export default QuizCardItem;