function QnAProgress({ current, total }) {
  const progress = Math.round(
    ((current + 1) / total) * 100
  );

  return (
    <div className="mb-8">

      <div className="flex justify-between items-center mb-3">

        <h2 className="font-medium text-gray-700">
          Question {current + 1} of {total}
        </h2>

        <h2 className="text-sm text-gray-500">
          {progress}% Completed
        </h2>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default QnAProgress;