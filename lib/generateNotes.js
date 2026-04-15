import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function generateChapterNotes(course) {
    try {
        const chapters = course?.courseLayout?.chapters;

        await Promise.all(
            chapters.map(async (chapter, index) => {
              const PROMPT = `
You are an expert educator and technical content writer.

Generate HIGH-QUALITY, detailed, and easy-to-understand study material for the given chapter.

The content must be:
- Beginner-friendly (explain like teaching a student)
- Very detailed (in-depth explanation for each topic)
- Well-structured
- Clear and engaging

STRICT FORMAT RULES:
- Output MUST be in valid HTML only
- DO NOT include <html>, <head>, or <body> tags
- Use only the following tags:
  <h3> for chapter title
  <h4> for topic titles
  <p> for explanations
  <ul> and <li> for lists
  <code> for code examples

CONTENT RULES:
- Start with chapter title using <h3>
- Add a strong introduction paragraph explaining the chapter
- For EACH topic:
  - Use <h4> for topic name
  - Add a VERY detailed explanation (minimum 8–10 lines per topic)
  - Include examples wherever possible
  - Use bullet points (<ul><li>) for clarity
- Add real-world examples wherever applicable
- Use simple language so that a beginner can easily understand
- Avoid repetition
- Make the content rich and explanatory (not short summaries)

STYLE RULES:
- Write like a teacher explaining concepts step-by-step
- Break complex ideas into simple parts
- Use analogies where possible
- Ensure smooth flow between topics

Chapter:
${JSON.stringify(chapter)}
`;

                const res = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            model: "openai/gpt-4o-mini",
                            messages: [{ role: "user", content: PROMPT }],
                        }),
                    }
                );

                const data = await res.json();
                const aiResp = data?.choices?.[0]?.message?.content;
                if (!aiResp) {
                    console.error("Empty AI response for chapter:", chapter.chapterTitle);
                    return;
                }
                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId: index + 1,
                    courseId: course.courseId,
                    notes: aiResp,
                });
            })
        );

        await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Ready" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId));
    } catch (error) {
        console.error("Background error:", error);
    }
}