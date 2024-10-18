import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface IProps {
  params: { id: number };
}

export async function GET({ params: { id } }: IProps) {
  try {
    const articleCritiques = await prisma.critique.findMany({
      where: { articleId: Number(id) },
      include: { Article: true, reviewer: true }, // Include article and user info if needed
    });
    return NextResponse.json(articleCritiques, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There was an error fetching critiques", error },
      { status: 500 }
    );
  }
}
