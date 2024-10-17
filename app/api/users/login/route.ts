import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { userLoginSchema } from "../../validationSchema";
import { loginCookie } from "@/app/lib/sessionManagement";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/constants/url";

export async function GET() {
  const users = await prisma.utilisateur.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const jwtsecret = JWT_SECRET;

  let body = await req.json();
  let query = req.cookies
  console.log(query)
  const validation = userLoginSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.utilisateur.findUnique({
    where: {
      email: body.email,
    },
  });


  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const isValidPassword = await bcrypt.compare(body.password, user.motdepasse);
  if (!isValidPassword)
    return NextResponse.json(
      { message: "Invalid credentials" },
      {
        status: 401,
      }
    );

  const token = jwt.sign(
    {
      user: user,
    },
    jwtsecret,
    {
      expiresIn: 60 * 1000,
    }
  );

  loginCookie(JSON.stringify(token));
  const returnedData = { token, user };
  return NextResponse.json(returnedData, { status: 200 });
}
