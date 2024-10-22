import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { articleStatusSchema } from "@/app/api/validationSchema";
import { getSession, getSessionFromRequest } from "@/app/lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken } from "@/app/types/type";

interface IProps {
  params: { id: number };
}

export async function GET(req: NextRequest, { params: { id } }: IProps) {
  try {
    const session = await getSession();
    const decoded = jwt.decode(JSON.parse(session!)) as IToken;

    const userId = decoded.user.id;

    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: {
        UtilisateurArticle: true,
        critiques: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const isAuthor = article.auteurId === userId;
    const isReviewer = article.UtilisateurArticle.some(
      (ua) => ua.utilisateurId === userId && ua.role === "REVIEWER"
    );

    if (!isAuthor && !isReviewer) {
      return NextResponse.json(
        { message: "You do not have access to this article." },
        { status: 403 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There was an error fetching the article", error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params: { id } }: IProps) {
  const body = await req.json();

  const validation = articleStatusSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { status } = body; // "APPROVED" or "REJECTED"
  try {
    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There was an error updating the article", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: IProps) {
  try {
    const deletedArticle = await prisma.article.delete({
      where: { id: id },
    });
    return NextResponse.json(deletedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Article", error },
      { status: 500 }
    );
  }
}
