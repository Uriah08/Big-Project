import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    protectedRoutes,
    authRoutes
} from "../routes";

export async function middleware (req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log("MIDDLE WARE:" + pathname);

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)']
}