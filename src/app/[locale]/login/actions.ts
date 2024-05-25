'use server'

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function login(formData: FormData) {
  const cookieStore = cookies()
  const locale = cookieStore.get("NEXT_LOCALE");
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/${locale?.value}/error`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const locale = cookieStore.get("NEXT_LOCALE");
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/${locale?.value}/error`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}
