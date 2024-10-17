import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface IProps {
  params: { id: number };
}

export async function GET({ params: { id } }: IProps) {
  try {
    const userCritiques = await prisma.critique.findMany({
      where: { reviewerId: Number(id) }, // Fetch all critiques by this bruh (reviewer)
      include: { Article: true },
    });
    return NextResponse.json(userCritiques, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user critiques", error },
      { status: 500 }
    );
  }
}
