import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface IProps {
  params: { id: number };
}

export async function GET(req: NextRequest, { params: { id } }: IProps) {
  try {
    const userArticles = await prisma.article.findMany({
      where: {
        OR: [
          { auteurId: Number(id) }, // Articles where the bruh is the author
        ],
      },
      include: { auteur: true, critiques: true },
    });

    return NextResponse.json(userArticles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There was an error fetching the article", error },
      { status: 500 }
    );
  }
}
