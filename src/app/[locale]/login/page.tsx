"use client";
import { createClient } from "@/app/utils/supabase/client";
import { login, signup } from "./actions";

export default function LoginPage() {
  const supabase = createClient();

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          style={{ color: "black", fontSize: "12px", padding: "6px" }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          style={{ color: "black", fontSize: "12px", padding: "6px" }}
          required
        />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}
      >
        Sign in with Google
      </button>
    </>
  );
}
