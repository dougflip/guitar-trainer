import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { SignInWithPasswordCreds } from "@/core/auth";
import { signInWithPassword } from "@/api";

/**
 * Mutation to update a practice session.
 */
export function useSignInWithPassword(
  options: Partial<
    UseMutationOptions<
      AuthTokenResponsePassword,
      unknown,
      SignInWithPasswordCreds
    >
  > = {},
) {
  return useMutation({
    ...options,
    mutationFn: signInWithPassword,
  });
}
