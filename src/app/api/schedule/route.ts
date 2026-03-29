import { NextResponse } from "next/server";
import { getCourseModules } from "@/lib/data-store";

export async function GET() {
  const modules = await getCourseModules();
  return NextResponse.json({ modules });
}
