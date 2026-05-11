import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { generateStudyTypeContent } from "@/lib/generateNotes";

export async function POST(req) {
    try {
        const { chapters, courseId, type } = await req.json();

        let PROMPT = "";

        const randomSeed = Math.floor(Math.random() * 100000);

        if (type === "Flashcard") {
            PROMPT = `
Generate 10 NEW and UNIQUE flashcards for the following topics:

${chapters}

IMPORTANT:
- Do NOT repeat previous flashcards
- Use different wording every time
- Use different examples and explanations
- Include conceptual, theoretical, and practical questions
- Mix easy, medium, and hard level questions
- Random Seed: ${randomSeed}

RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add explanation text
- Use double quotes only

Output format:
[
  {
    "front": "Question here",
    "back": "Answer here"
  }
]
`;
        }


        if (type === "Quiz") {
            PROMPT = `
Generate 10 NEW and DIFFERENT quiz questions for the following topics:

${chapters}

IMPORTANT:
- Do NOT repeat old quiz questions
- Use different wording and examples
- Include conceptual and application-based questions
- Mix easy, medium, and hard questions
- Each question should have 4 options
- Random Seed: ${randomSeed}

RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add explanation text
- Use double quotes only

Output format:
[
  {
    "question": "Question here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Correct Answer"
  }
]
`;
        }

        if (type === "QA") {
            PROMPT = `
Generate 10 NEW and UNIQUE questions and answers for the following topics:

${chapters}

IMPORTANT:
- Do NOT repeat previous questions
- Use different explanations and examples
- Include theoretical and practical questions
- Mix easy, medium, and hard questions
- Random Seed: ${randomSeed}

RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add explanation text
- Use double quotes only

Output format:
[
  {
    "question": "Question here",
    "answer": "Answer here"
  }
]
`;
        }

        await db
            .delete(STUDY_TYPE_CONTENT_TABLE)
            .where(
                and(
                    eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, type)
                )
            );

        const result = await db
            .insert(STUDY_TYPE_CONTENT_TABLE)
            .values({
                courseId,
                type,
                status: "Generating",
            })
            .returning({
                id: STUDY_TYPE_CONTENT_TABLE.id,
            });


        await generateStudyTypeContent({
            studyType: type,
            prompt: PROMPT,
            courseId,
            recordId: result[0].id,
        });

        return NextResponse.json({
            success: true,
            message: `${type} regenerated successfully`,
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}