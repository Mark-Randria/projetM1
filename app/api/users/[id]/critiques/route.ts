import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface IProps {
  params: { id: number };
}

export async function GET(req: NextRequest, { params: { id } }: IProps) {
  try {
    const userArticles = await prisma.article.findMany({
      where: {
        UtilisateurArticle: {
          some: {
            utilisateurId: Number(id),
            role: "REVIEWER", // Ensure that the role is REVIEWER
          },
        },
        AND: {
          status: {
            equals: "APPROVED",
          },
        }
      },
      include: {
        auteur: true,
        critiques: true,
      },
    });
    return NextResponse.json(userArticles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user critiques", error },
      { status: 500 }
    );
  }
}
