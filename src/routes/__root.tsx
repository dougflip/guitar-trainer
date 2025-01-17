import { MainAppShell } from "@/components/layout/MainAppShell";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainAppShell />
      <TanStackRouterDevtools />
    </>
  ),
});
