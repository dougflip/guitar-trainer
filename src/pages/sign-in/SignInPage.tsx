import { useNavigate, useRouteContext } from "@tanstack/react-router";

import { SignInForm } from "@/components/auth/SignInForm";
import { SignInWithPasswordCreds } from "@/core/auth";
import { signInWithPassword } from "@/api";
import { useState } from "react";

export function SignInPage() {
  const { setAuth } = useRouteContext({ from: "__root__" });
  const nav = useNavigate();
  const [err, setErr] = useState("");

  // TODO: This can probably be a mutation? maybe?
  // then we can do a proper loading state and clear the error
  // also, do we want error messages or toasts?
  async function handleSubmit(creds: SignInWithPasswordCreds) {
    const { data, error } = await signInWithPassword(creds);
    if (error || !data.user) {
      setErr("Invalid email or password");
      return;
    }

    setAuth({ kind: "authenticated", user: data.user });
    nav({ to: "/" });
  }

  return <SignInForm onSubmit={handleSubmit} errorMessage={err} />;
}
