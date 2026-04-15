import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },// to trigger the event
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s"); // wait for 1 second before returning the response
        return { message: `Hello ${event.data.email}!` };
    },
);

export const createNewUser = inngest.createFunction(
    { id: 'create-user' },
    { event: 'user.create' },
    async ({ event, step }) => {
        const { user } = event.data;
        const result = await step.run('Check User and create New if not in Database', async () => {
            const result = await db.select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

            console.log(result);

            if (result?.length == 0) {
                const response = await db.insert(USER_TABLE).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                }).returning({ id: USER_TABLE.id })
                return response;
            }
            return result;
        })
        return 'Success'
    }
)

export const GenerateNotes = inngest.createFunction(
    { id: "generate-course-notes" },
    { event: "notes.generate" },
    async ({ event, step }) => {
        const { course } = event.data;
        const chapters = course?.courseLayout?.chapters;

        // ✅ Run ALL chapters in parallel
        await step.run("Generate Notes Parallel", async () => {
            await Promise.all(
                chapters.map(async (chapter, index) => {
                    const PROMPT = `
Generate detailed study notes in HTML format.

Rules:
- Use <h3> for chapter title
- Use <h4> for topics
- Use <p> for explanation
- Do NOT include html/head/body tags

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
                    await db.insert(CHAPTER_NOTES_TABLE).values({
                        chapterId: index + 1,
                        courseId: course.courseId,
                        notes: aiResp,
                    });
                })
            );
        });

        await step.run("Update Status", async () => {
            await db
                .update(STUDY_MATERIAL_TABLE)
                .set({ status: "Ready" })
                .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId));
        });

        return { success: true };
    }
);
