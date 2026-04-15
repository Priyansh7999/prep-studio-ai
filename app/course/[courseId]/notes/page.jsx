"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (courseId) {
      GetNotes();
    }
  }, [courseId]);

  const GetNotes = async () => {
    try {
      const result = await axios.get(
        `/api/study-type?courseId=${courseId}&type=notes`
      );
      console.log("Notes:", result.data);
      setNotes(result.data.notes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const styleContent = (content) => {
    if (!content) return "";

    return content
      .replace(
        /<h3>/g,
        `<h3 style="font-size:28px; font-weight:700; margin:20px 0 10px; color:#111;">`
      )
      .replace(
        /<h4>/g,
        `<h4 style="font-size:22px; font-weight:600; margin:16px 0 8px; color:#222;">`
      )
      .replace(
        /<p>/g,
        `<p style="font-size:16px; color:#444; line-height:1.8; margin-bottom:14px;">`
      )
      .replace(
        /<ul>/g,
        `<ul style="padding-left:20px; margin-bottom:14px;">`
      )
      .replace(
        /<li>/g,
        `<li style="margin-bottom:8px;">`
      )
      .replace(
        /<code>/g,
        `<code style="background:#f4f4f4; padding:3px 6px; border-radius:6px; font-size:14px;">`
      );
  };
  return (
    <div>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          disabled={stepCount === 0}
          onClick={() => setStepCount((prev) => prev - 1)}
        >
          Previous
        </Button>

        {notes.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${index <= stepCount ? "bg-primary" : "bg-gray-200"
              }`}
          />
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      <div className="mt-6 p-4 border rounded-lg">
        {notes.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: styleContent(notes[stepCount]?.notes || ""),
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
        {
          notes.length < stepCount + 1 && (
            <div className="text-center mt-10">
              <h2>End of notes</h2>
              <Button onClick={() => router.push('/course/' + courseId)}>Go to Course Page</Button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ViewNotes;