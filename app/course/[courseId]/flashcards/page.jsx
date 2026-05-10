"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../../../_components/Loading";
import FlashcardHeader from "./_components/FlashcardHeader";
import FlashcardProgress from "./_components/FlashcardProgress";
import FlashcardCarousel from "./_components/FlashcardCarousel";
import FlashcardCompletion from "./_components/FlashcardCompletion";

function Flashcards() {
  const { courseId } = useParams();
  const router = useRouter();

  const [flashCards, setFlashCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [api, setApi] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetFlashCards();
  }, []);

  const GetFlashCards = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(
        `/api/study-type?courseId=${courseId}&type=flashcard`
      );

      setFlashCards(result?.data?.flashcards?.[0]?.content || []);
    } catch (error) {
      toast.error("Failed to load flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();

      setCurrentIndex(index);
      setFlippedIndex(null);

      setIsCompleted(index === flashCards.length - 1);
    };

    api.on("select", onSelect);

    onSelect();

    return () => api.off("select", onSelect);
  }, [api, flashCards]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <FlashcardHeader />
      <FlashcardProgress
        currentIndex={currentIndex}
        total={flashCards.length}
      />
      {isCompleted ? (
        <FlashcardCompletion
          api={api}
          setIsCompleted={setIsCompleted}
          courseId={courseId}
        />
      ) : (
        <FlashcardCarousel
          flashCards={flashCards}
          flippedIndex={flippedIndex}
          setFlippedIndex={setFlippedIndex}
          setApi={setApi}
        />
      )}
    </div>
  );
}

export default Flashcards;