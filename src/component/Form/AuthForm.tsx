"use client"

import { signInWithGoogle } from "../../utils/supabase/actions"

export default function AuthForm() {
  return (
    <div>
      <form>
        <button formAction={signInWithGoogle} className="border rounded px-2.5 py-2">Sign in with Google</button>
      </form>
    </div>
  );
}

