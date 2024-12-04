import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    // protectedRoutes,
    authRoutes
} from "../routes";

export async function middleware (req: NextRequest) {
    const { nextUrl } = req;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    const token = req.cookies.get("token");

    console.log(token);

    if (isAuthRoute) {
        if (token) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    }

    if (!token && isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/sign-in", nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)']
}