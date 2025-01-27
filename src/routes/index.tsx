import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Redirects the user to training sessions as the root page.
 * In the future this can render the training sessions page if we want.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/training-sessions",
    });
  },
});
