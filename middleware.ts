import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Validate environment variables on startup (server-side only)
if (typeof window === 'undefined') {
  try {
    const { validateEnvVars } = require('@/lib/validate-env');
    validateEnvVars();
  } catch (error: any) {
    // Only throw in production
    if (process.env.NODE_ENV === 'production' && error.message?.includes('Missing required')) {
      console.error('Environment validation failed:', error.message);
    }
  }
}

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe", "/api/health", "/sign-in", "/sign-up", "/forgot-password"],
  async afterAuth(auth, req) {
    // Anti-scraping protection
    const userAgent = req.headers.get('user-agent') || '';
    const isBot = /bot|crawler|spider|crawling|scraper/i.test(userAgent);
    
    // Block known scrapers/bots from API endpoints
    if (req.nextUrl.pathname.startsWith('/api/') && isBot && !userAgent.includes('Googlebot')) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

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
        userAgent: userAgent.substring(0, 100), // Log first 100 chars
      });

      return response;
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
