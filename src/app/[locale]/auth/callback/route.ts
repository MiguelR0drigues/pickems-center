import { createClient } from '@/app/utils/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const locale = url.pathname.split('/')[1]; // Extract locale from the URL
  const code = url.searchParams.get('code'); // Get the code from the URL
  const next = `/${locale}/`;

  // Create redirect link without the secret token
  const redirectTo = new URL(url.toString());
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('code');

  if (code) {
    const supabase = createClient();

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo.toString());
    }
  }

  // Return the user to an error page with some instructions
  redirectTo.pathname = `/${locale}/error`;
  return NextResponse.redirect(redirectTo.toString());
}
