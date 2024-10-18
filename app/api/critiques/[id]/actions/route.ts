import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { critiqueUpdateSchema } from "@/app/api/validationSchema";

interface IProps {
  params: { id: number };
}

export async function PATCH(req: NextRequest, { params: { id } }: IProps) {
  const body = await req.json();
  const validation = critiqueUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const updatedCritique = await prisma.critique.update({
      where: { id: Number(id) },
      data: {
        titreCritique: body.titreCritique,
        descriptionCritique: body.descriptionCritique,
      },
    });
    return NextResponse.json(updatedCritique, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating critique", error },
      { status: 500 }
    );
  }
}

export async function DELETE({ params: { id } }: IProps) {
  try {
    const deletedCritique = await prisma.critique.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedCritique, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "There deleting critique", error },
      { status: 500 }
    );
  }
}
