import { NextResponse } from "next/server";
import { getMilestones } from "@/lib/data-store";

export async function GET() {
  const milestones = await getMilestones();
  return NextResponse.json({ milestones });
}
