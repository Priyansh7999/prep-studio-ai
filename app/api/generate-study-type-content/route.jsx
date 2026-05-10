import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { generateStudyTypeContent } from "@/lib/generateNotes";

export async function POST(req) {
    try {
        const { chapters, courseId, type } = await req.json();

        let PROMPT = "";

        if (type === "Flashcard") {
            PROMPT = `
Generate 10 flashcards for the following topics:

${chapters}

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT use \`\`\`
- Do NOT add explanation
- Do NOT add text before or after JSON
- All property names and string values must use double quotes
- Escape special characters properly

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
Generate a quiz for the following topics:

${chapters}

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT use \`\`\`
- Do NOT add explanation
- Do NOT add text before or after JSON
- All property names and string values must use double quotes
- Escape special characters properly

Output format:
[
  {
    "question": "Question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Answer here"
  }
]
`;
        }
        if (type === "QA") {
            PROMPT = `
Generate 10 questions and answers for the following topics:

${chapters}

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT use \`\`\`
- Do NOT add explanation
- Do NOT add text before or after JSON
- All property names and string values must use double quotes
- Escape special characters properly

Output format:
[
  {
    "question": "Question here",
    "answer": "Answer here"
  }
]
`;
        }


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
            message: "Content generation started",
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}