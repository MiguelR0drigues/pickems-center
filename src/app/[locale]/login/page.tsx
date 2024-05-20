"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log("User was signed in!");
    } catch (error) {
      console.error("Error thrown:", error.message);
    }
  };

  return (
    <div>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin(email, password)}>
        Sign in with Email
      </button>
      <button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
