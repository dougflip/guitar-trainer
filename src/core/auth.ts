export type AuthUser = {
  uid: string;
  email: string;
};

export type AuthState =
  | { kind: "unauthenticated" }
  | { kind: "authenticated"; user: AuthUser };
