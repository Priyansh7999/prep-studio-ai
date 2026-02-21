import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { user } = await req.json();

  const existing = await db
    .select()
    .from(USER_TABLE)
    .where(eq(USER_TABLE.email, user.email));

  if (existing.length === 0) {
    const inserted = await db.insert(USER_TABLE).values({
      name: user.fullName,
      email: user.email,
    });

    return NextResponse.json({ created: true, inserted });
  }

  return NextResponse.json({ created: false, user: existing });
}