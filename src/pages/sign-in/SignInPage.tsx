import { useNavigate, useRouteContext } from "@tanstack/react-router";

import { SignInForm } from "@/components/auth/SignInForm";
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

  return (
    <SignInForm
      onSubmit={signIn.mutate}
      errorMessage={err}
      isSubmitting={signIn.isPending}
    />
  );
}
