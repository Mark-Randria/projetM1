import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'

export async function GET() {
  const users = await prisma.utilisateur.findMany()
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  return NextResponse.json(body);
}
