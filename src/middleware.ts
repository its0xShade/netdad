import { NextResponse, type NextRequest } from "next/server";

// Simple in-memory rate limiter (per instance — fine for static site)
const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 100; // requests per window
const WINDOW_MS = 60_000; // 1 minute

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Static site — no API routes currently, but keep the guard for future
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const now = Date.now();
    const entry = RATE_LIMIT.get(ip);
    if (!entry || entry.resetAt < now) {
      RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      entry.count++;
      if (entry.count > LIMIT) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }
    }
  }

  const res = NextResponse.next();

  // Security headers
  const headers = res.headers;
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://cdn.jsdelivr.net; frame-ancestors 'none';"
  );

  return res;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};