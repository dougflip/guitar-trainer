import { useRouteContext } from "@tanstack/react-router";

/**
 * Returns the authenticated user from the __root__ route context.
 * This **must** be used within an authenticated route.
 * If the route is not authenticated, an error will be thrown.
 */
export function useAuthenticatedUser() {
  const { auth } = useRouteContext({ from: "__root__" });

  if (auth.kind === "authenticated") {
    return { user: auth.user };
  }

  throw new Error(
    "useAuthenticatedUser must be used within an authenticated route.",
  );
}
