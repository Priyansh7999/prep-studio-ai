function QnACard({ currentQna }) {
    return (
        <div className="space-y-8">
            <div
                className="bg-blue-50 border border-blue-200 rounded-3xl p-8 shadow-sm"
            >
                <div className="mb-4">
                    <span
                        className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                        Question
                    </span>
                </div>
                <h2
                    className="text-2xl font-semibold text-gray-800 leading-10"
                >
                    {currentQna?.question}
                </h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 shadow-sm">
                <div className="mb-4">
                    <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Answer
                    </span>
                </div>
                <div className="max-h-85 overflow-y-auto pr-2">
                    <p className="text-lg leading-9 text-gray-700">
                        {currentQna?.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QnACard;