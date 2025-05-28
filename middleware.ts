import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe"],
  async afterAuth(auth, req) {
    // Track API usage
    if (req.nextUrl.pathname.startsWith('/api/')) {
      const start = Date.now();
      const response = await NextResponse.next();
      const duration = Date.now() - start;

      // Log API usage
      console.log({
        path: req.nextUrl.pathname,
        method: req.method,
        duration,
        userId: auth.userId,
        timestamp: new Date().toISOString(),
      });

      return response;
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 