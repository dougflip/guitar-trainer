import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Redirects the user to practice sessions as the root page.
 * In the future this can render the practice sessions page if we want.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/practice-sessions",
    });
  },
});
