import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/constants/url";
import { userCreationSchema } from "../../validationSchema";
import { loginCookie } from "@/app/lib/sessionManagement";

export async function POST(req: NextApiRequest) {
  const jwtsecret = JWT_SECRET;

  const { email, nom, prenom, password } = req.body;
  const validation = userCreationSchema.safeParse({
    email,
    nom,
    prenom,
    password,
  });
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.utilisateur.create({
      data: {
        email: email,
        nom: nom,
        prenom: prenom,
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
