import { User } from "@supabase/supabase-js";

export type SignInWithPasswordCreds = {
  email: string;
  password: string;
};

export type AuthUser = User;

export type AuthState =
  | { kind: "unauthenticated" }
  | { kind: "authenticated"; user: AuthUser };
