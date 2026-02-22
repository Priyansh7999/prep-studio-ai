import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
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
        const {user} = event.data;
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
    //send welcome email notification
    //send email notification after 3 day of user creation
)
