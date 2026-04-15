import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { courseId, studyType } = await request.json();
    if (studyType == 'ALL') {
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

        const result = {
            notes: notes,
            flashcard: null,
            quiz: null,
            qa: null,
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
}