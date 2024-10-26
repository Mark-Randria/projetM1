import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { articleCreationSchema } from "../validationSchema";

/**
 * @swagger
 * /api/articles:
 *   get:
 *     description: Returns the list of all article
 *     responses:
 *       200:
 *         description: return the list of all articles
 */

export async function GET(req: NextRequest) {
  try {
    const pendingArticles = await prisma.article.findMany({
      where: {
        status: {
          equals: "PENDING",
        },
      },
      include: {
        auteur: true,
        critiques: true,
      },
    });
    const articles = await prisma.article.findMany({
      where: {
        status: {
          not: "PENDING",
        },
      },
      include: {
        auteur: true,
        critiques: true,
      },
    });
    return NextResponse.json({ pendingArticles, articles }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching articles", err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
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
