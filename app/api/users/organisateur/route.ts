import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "nothing to see here" }, { status: 426 });
}
