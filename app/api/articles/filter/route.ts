import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { titreArticle, auteur, contenu } = body; // Extract search parameters from the request body

  if (!titreArticle && !auteur && !contenu) {
    return NextResponse.json(
      { message: "At least one search parameter must be provided." },
      { status: 400 }
    );
  }

  try {
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          {
            titreArticle: {
              contains: titreArticle || "", // Search by title (optional)
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            contenu: {
              contains: contenu || "", // Search by content (optional)
              mode: "insensitive",
            },
          },
          {
            auteur: {
              nom: {
                contains: auteur || "", // Search by author's name (optional)
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        auteur: true, // Include author information
        critiques: true, // Include critiques if needed
      },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching articles", err },
      { status: 500 }
    );
  }
}
