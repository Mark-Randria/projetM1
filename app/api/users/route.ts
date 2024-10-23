import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.utilisateur.findMany();
  return NextResponse.json(users);
}