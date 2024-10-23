import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/constants/url";
import { userCreationSchema } from "../../validationSchema";
import { loginCookie } from "@/app/lib/sessionManagement";

export async function POST(req: NextRequest) {
  const jwtsecret = JWT_SECRET;

  let body = await req.json();
  const validation = userCreationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.utilisateur.create({
      data: {
        email: body.email,
        nom: body.nom,
        prenom: body.prenom,
        motdepasse: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        user: newUser,
      },
      jwtsecret,
      {
        expiresIn: 60 * 1000,
      }
    );

    loginCookie(JSON.stringify(token));
    return NextResponse.json(token, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating user", err },
      {
        status: 500,
      }
    );
  }
}
