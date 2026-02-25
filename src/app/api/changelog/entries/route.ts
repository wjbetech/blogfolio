import { NextResponse } from "next/server";
import { getChangelogSlice } from "@/lib/changelog/entryParser";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset") ?? "0");
  const limit = Number(url.searchParams.get("limit") ?? "5");

  const entries = getChangelogSlice(offset, limit);

  return NextResponse.json({ entries, offset, limit });
}
