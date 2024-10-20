import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { articleStatusSchema } from "@/app/api/validationSchema";

interface IProps {
  params: { id: number };
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
