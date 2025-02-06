import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignInPage } from "@/pages/sign-in/SignInPage";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: ({ context }) => {
    if (context.auth.kind === "authenticated") {
      throw redirect({
        to: "/practice-sessions",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInPage />;
}
