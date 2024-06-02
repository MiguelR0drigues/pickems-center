import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url =  process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    url!,
    key!
  );
}
