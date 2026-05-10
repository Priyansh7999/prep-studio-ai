"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import NotesHeader from "./_components/NotesHeader";
import NotesProgress from "./_components/NotesProgress";
import NotesContent from "./_components/NotesContent";
import NotesCompleted from "./_components/NotesCompleted";
import Loading from "../../../_components/Loading";

function ViewNotes() {
  const { courseId } = useParams();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      GetNotes();
    }
  }, [courseId]);

  const GetNotes = async () => {
    try {
      setLoading(true);

      const result = await axios.get(
        `/api/study-type?courseId=${courseId}&type=notes`
      );

      setNotes(result?.data?.notes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (stepCount < notes.length) {
      setStepCount((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (stepCount >= notes.length) {
    return (
      <NotesCompleted
        courseId={courseId}
        router={router}
        setStepCount={setStepCount}
      />
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <NotesHeader />
      <NotesProgress
        stepCount={stepCount}
        notesLength={notes.length}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <NotesContent
        content={notes[stepCount]?.notes}
      />
    </div>
  );
}

export default ViewNotes;