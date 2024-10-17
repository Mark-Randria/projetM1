import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function loginCookie(data: string) {
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  cookies().set("session", data, {
    expires,
    httpOnly: true,
  });
}

export async function logoutSession() {
  cookies().set("session", "", {
    expires: new Date(0),
  });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return session;
}

export async function updateSession(req: NextRequest) {
  const session = cookies().get("session")?.value;
  if (!session) return;

  const newExpire = new Date(Date.now() + 5 * 60 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: newExpire,
  });
  return res;
}