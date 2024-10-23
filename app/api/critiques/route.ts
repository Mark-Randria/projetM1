import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { critiqueCreationSchema } from "../validationSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = critiqueCreationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const newCritique = await prisma.critique.create({
      data: {
        titreCritique: body.titreCritique,
        descriptionCritique: body.descriptionCritique,
        reviewerId: body.reviewerId,
        articleId: body.articleId,
      },
    });
    return NextResponse.json(newCritique, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating critique", error },
      {
        status: 500,
      }
    );
  }
}
