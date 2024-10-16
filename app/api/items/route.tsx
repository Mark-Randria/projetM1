import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'

export async function GET() {
  const articles = await prisma.article.findMany()
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  return NextResponse.json(body);
}
