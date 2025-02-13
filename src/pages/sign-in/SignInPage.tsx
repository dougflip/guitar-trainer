import { useNavigate, useRouteContext } from "@tanstack/react-router";

import { SignInForm } from "@/components/auth/SignInForm";
import { envConfig } from "@/config";
import { supabase } from "@/api/supabase-client";
import { useSignInWithPassword } from "@/queries";
import { useState } from "react";

export function SignInPage() {
  const { setAuth } = useRouteContext({ from: "__root__" });
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const signIn = useSignInWithPassword({
    onMutate: () => setErr(""),
    onSuccess({ data, error }) {
      if (error || !data.user) {
        setErr("Invalid email or password");
        return;
      }

      setAuth({ kind: "authenticated", user: data.user });
      nav({ to: "/" });
    },
  });

  const handleGoogleSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: envConfig.googleOAuthRedirectTo },
    });
  };

  return (
    <SignInForm
      onSubmit={signIn.mutate}
      onGoogleSignIn={handleGoogleSignIn}
      errorMessage={err}
      submitting={signIn.isPending}
    />
  );
}
