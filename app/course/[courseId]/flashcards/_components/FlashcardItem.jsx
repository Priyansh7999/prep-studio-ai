"use client";
import React from "react";
function FlashcardItem({ flashcard, isFlipped, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-[320px] h-105 duration-500`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl shadow-xl border bg-white flex flex-col justify-center items-center p-8"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="mb-5 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 leading-10">
            {flashcard?.front}
          </h2>

          <p className="absolute bottom-5 text-sm text-gray-400">
            Tap to flip
          </p>
        </div>
        <div
          className="absolute inset-0 rounded-3xl shadow-xl border bg-primary text-white flex flex-col justify-center items-center p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-5 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
          </div>

          <h2 className="text-xl font-medium text-center leading-9">
            {flashcard?.back}
          </h2>

          <p className="absolute bottom-5 text-sm text-white/70">
            Tap to flip
          </p>
        </div>
      </div>
    </div>
  );
}

export default FlashcardItem;