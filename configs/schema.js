import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("user_name", { length: 255 }).notNull(),
    email:varchar().notNull(),
    isMember: boolean().default(false).notNull(),
});