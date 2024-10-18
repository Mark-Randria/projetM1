import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { assignReviewerSchema } from "@/app/api/validationSchema";

interface IProps {
  params: { id: number };
}

export async function POST(req: NextRequest, { params: { id } }: IProps) {
  const body = await req.json();
  const validation = assignReviewerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
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
