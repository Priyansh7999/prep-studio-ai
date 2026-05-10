import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { courseId, studyType } = await request.json();

  if (studyType == "ALL") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    const contentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

    const result = {
      notes: notes,
      flashcard: contentList?.filter((item) => item.type == "Flashcard"),
      quiz: contentList?.filter((item) => item.type == "Quiz"),
      qa: contentList?.filter((item) => item.type == "QA"),
    };
    return NextResponse.json(result);
  }
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const type = searchParams.get("type");

  if (type === "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    return Response.json({ notes });
  }
  if (type === "flashcard") {
    const flashcards = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, "Flashcard")
        )
      );

    return NextResponse.json({
      flashcards,
    });
  }
  if (type === "quiz") {
    const quiz = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, "Quiz")
        )
      );

    return NextResponse.json({
      quiz,
    });
  }
   if (type === "qa") {
    const qa = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, "QA")
        )
      );

    return NextResponse.json({
      qa,
    });
  }
}