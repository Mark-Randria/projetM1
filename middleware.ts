import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/lib/sessionManagement";
import jwt from "jsonwebtoken";

interface IToken {
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motdepasse: string;
    isAdmin: boolean;
  };
}

const adminPage = "/admin";
const dashboardPage = "/dashboard";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const currentPath = request.nextUrl.pathname;
  if (!session) {
    return NextResponse.redirect(new URL("/registration/login", request.url));
  }

  const decoded = <IToken>jwt.decode(JSON.parse(session));
  if (decoded.user.isAdmin) {
    if (currentPath.startsWith(adminPage)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(adminPage, request.url));
  } else {
    if (currentPath.startsWith(dashboardPage)) {
      return NextResponse.next();
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
