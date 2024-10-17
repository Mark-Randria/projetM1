import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { articleCreationSchema } from "../validationSchema";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        auteur: true,
        critiques: true,
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

export async function POST(req: NextRequest) {
  let body = await req.json();

  const validation = articleCreationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const newArticle = await prisma.article.create({
      data: {
        titreArticle: body.titreArticle,
        contenu: body.contenu,
        auteur: { connect: { id: body.auteurId } }, // Connect to the author (Utilisateur)
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating article", error },
      {
        status: 500,
      }
    );
  }
}
