import createMiddleware from "next-intl/middleware";
import { type NextRequest } from 'next/server';
import { updateSession } from "./app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Update user's auth session
  const response = await updateSession(request);
  
  // Create the next-intl middleware instance
  const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ["en", "pt"],
  
    // Used when no locale matches
    defaultLocale: "en",
  });

  // Return the combined response
  return intlMiddleware(request) || response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*"],
};