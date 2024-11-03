import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { articleCreationSchema } from "../validationSchema";
import fs from "fs";
import path from "path";

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
  const formData = await req.formData();
  const titreArticle = formData.get("titreArticle") as string;
  const contenu = formData.get("contenu") as string;
  const auteurId = Number(formData.get("auteurId"));
  const file = (formData.get("pdfFile") as any) || null;

  let relativePath = null;

  const validation = articleCreationSchema.safeParse({
    titreArticle,
    contenu,
    auteurId,
    file,
  });
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    if (file) {
      const uniqueFilename = `${Date.now()}_${file.name}`;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        uniqueFilename
      );

      const buffer = Buffer.from(await file.arrayBuffer());

      await fs.promises.writeFile(uploadPath, buffer);

      relativePath = `/uploads/${uniqueFilename}`;
    }

    const newArticle = await prisma.article.create({
      data: {
        titreArticle: titreArticle,
        contenu: contenu,
        pdfPath: relativePath,
        auteur: { connect: { id: auteurId } },
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    if (relativePath) {
      const fullPath = path.join(process.cwd(), "public", relativePath);
      try {
        await fs.promises.unlink(fullPath);
        console.log("File deleted due to database error.");
      } catch (deleteError) {
        console.error(
          "Failed to delete file after database error:",
          deleteError
        );
      }
    }
    return NextResponse.json(
      { message: "Error creating article", error },
      {
        status: 500,
      }
    );
  }
}
