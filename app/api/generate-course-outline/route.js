import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { generateChapterNotes } from "@/lib/generateNotes";

export async function POST(req) {
    try {
        const { courseId, topic, studyType, difficulty, createdBy } =
            await req.json();

        const PROMPT = `Generate a study material for topic: '${topic}' for '${studyType}' level. 
Difficulty: '${difficulty}'. 

Provide the output strictly in valid JSON format.

Rules:
- Generate a proper course title and summary
- Create multiple chapters
- Each chapter must include:
  - chapterTitle
  - image of title
  - emoji
  - summary
  - topics (IMPORTANT: Generate a detailed list of topics based on the chapter content. Do NOT limit the number of topics. Add as many as needed for proper understanding.)

Use this structure:
{
  "courseTitle": "string",
  "courseImage": "image.png"
  "summary": "string",
  "chapters": [
    {
      "chapterTitle": "string",
      "emoji": "string",
      "summary": "string",
      "topics": ["string"]
    }
  ]
}

Important: Return ONLY raw JSON. No markdown, no explanation.`;

        const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: PROMPT,
                    },
                ],
            }),
        });

        const data = await aiResponse.json();

        let aiText = data?.choices?.[0]?.message?.content;

        if (!aiText) {
            throw new Error("AI response is empty");
        }

        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

        let aiResult;
        try {
            aiResult = JSON.parse(aiText);
        } catch (err) {
            console.error("JSON Parse Error:", aiText);
            throw new Error("Invalid JSON from AI");
        }

        const dbResult = await db
            .insert(STUDY_MATERIAL_TABLE)
            .values({
                courseId,
                courseType: studyType,
                difficultyLevel: difficulty,
                topic,
                createdBy,
                courseLayout: aiResult,
            })
            .returning();
            generateChapterNotes(dbResult[0]);

        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error("Detailed Error:", error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error.message,
            },
            { status: 500 }
        );
    }
}