import { NextResponse } from "next/server";
import { getUpdates } from "@/lib/data-store";

export async function GET() {
  const updates = await getUpdates();
  return NextResponse.json({ updates });
}
