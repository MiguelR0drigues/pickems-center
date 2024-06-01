/* eslint-disable react-hooks/rules-of-hooks */
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

  console.log("ACTION LOGIN > SUCCESS > DATA", data)

  if (error) {
    console.error("ACTION LOGIN > ERROR > ERROR", error)
    redirect(`/${locale?.value}?error=${error.message}`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const locale = cookieStore.get("NEXT_LOCALE");
  const supabase = createClient();

  const payload = {
    username: formData.get('su-username') as string,
    email: formData.get('su-email') as string,
    password: formData.get('su-password') as string,
  };

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data:{
        username: payload.username,
      }
    }
  });

  console.log("ACTION REGISTER > SUCCESS > DATA", data)

  if (error) {
    console.error("ACTION REGISTER > ERROR > ERROR", error)
    redirect(`/${locale?.value}?error=${error.message}`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}

export async function logout() {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE");
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(`/${locale?.value}?error=${error.message}`);
  }

  revalidatePath(`/${locale?.value}`, 'layout');
  redirect(`/${locale?.value}`);
}