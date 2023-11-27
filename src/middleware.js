import { NextResponse } from "next/server";
import { isUserInAuthPage, isUserInMainPage, verifyToken } from "./utils/authMiddleware";

export async function middleware(request) {
  const cookie = request.cookies.get('accessToken');
  const accessToken = cookie?.value;

  const authenticatedUser = await verifyToken(accessToken)

  if (isUserInAuthPage(request)) {
    if (authenticatedUser) return NextResponse.redirect(new URL('/products', request.url))
  }

  if (isUserInMainPage(request)) {
    if (!authenticatedUser) return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/direct-rent', '/checkout', '/auth']
}