import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./app/lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken } from "./app/types/type";

const adminPage = "/admin";
const dashboardPage = "/dashboard";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const currentPath = request.nextUrl.pathname;
  if (!session) {
    return NextResponse.redirect(new URL("/registration/login", request.url));
  }

  const updatedSessionResponse = await updateSession();

  const decoded = <IToken>jwt.decode(JSON.parse(session));
  if (decoded.user.isAdmin) {
    if (currentPath.startsWith(adminPage)) {
      return updatedSessionResponse || NextResponse.next();
    }

    return NextResponse.redirect(new URL(adminPage, request.url));
  } else {
    if (currentPath.startsWith(dashboardPage)) {
      return updatedSessionResponse || NextResponse.next();
    }

    return NextResponse.redirect(new URL(dashboardPage, request.url));
  }
}

export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
