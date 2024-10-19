import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { assignReviewerSchema } from "@/app/api/validationSchema";

interface IProps {
  params: { id: number };
}

export async function GET(req: NextRequest, { params: { id } }: IProps) {
  try {
    const reviewers = await prisma.utilisateurArticle.findMany({
      where: {
        articleId: Number(id),
        role: "REVIEWER",
      },
      include: {
        utilisateur: true,
      },
    });

    const users = reviewers.map((reviewer) => reviewer.utilisateur);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching reviewer", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params: { id } }: IProps) {
  const body = await req.json();
  const validation = assignReviewerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        auteurId: true,
      },
    });

    if (article!.auteurId === body.reviewerId) {
      return NextResponse.json(
        {
          message:
            "The author cannot be assigned as a reviewer to their own article",
        },
        { status: 400 }
      );
    }

    const assignReviewer = await prisma.utilisateurArticle.create({
      data: {
        utilisateurId: body.reviewerId,
        articleId: Number(id),
        role: "REVIEWER",
      },
    });
    return NextResponse.json(assignReviewer, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error assigning reviewer", err },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: IProps) {
  const { reviewerId } = await req.json();
  try {
    const result = await prisma.utilisateurArticle.deleteMany({
      where: {
        articleId: Number(id),
        utilisateurId: reviewerId,
        role: "REVIEWER",
      },
    });
    if (result.count === 0) {
      return NextResponse.json(
        { message: "Reviewer not found for this article" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Reviewer removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error removing reviewer", error },
      { status: 500 }
    );
  }
}
