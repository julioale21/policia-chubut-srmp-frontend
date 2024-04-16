import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, origin } = req.nextUrl;

  // Redirect to dashboard if the user is already authenticated and trying to access the login page
  if (session && pathname === '/login') {
    // Construct the absolute URL for the dashboard
    const dashboardUrl = `${origin}/dashboard`;
    return NextResponse.redirect(dashboardUrl);
  }

  // Continue with the request for other paths
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};
