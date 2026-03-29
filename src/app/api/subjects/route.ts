import { NextResponse } from "next/server";
import { getSubjects } from "@/lib/data-store";

export async function GET() {
  const subjects = await getSubjects();
  return NextResponse.json({ subjects });
}
