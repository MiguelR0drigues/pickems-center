'use server'

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function login(formData: FormData) {
  const cookieStore = cookies()
  const locale = cookieStore.get("NEXT_LOCALE");
  const supabase = createClient();

  const payload = {
    email: formData.get('si-email') as string,
    password: formData.get('si-password') as string,
  };

  const {data, error } = await supabase.auth.signInWithPassword(payload);


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

  const payload = {
    name: formData.get('su-username') as string,
    email: formData.get('su-email') as string,
    password: formData.get('su-password') as string,
  };

  console.log(payload)

  const { data, error } = await supabase.auth.signUp(payload);
  console.log(data)

  if (error) {
    redirect(`/${locale?.value}/error`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}
