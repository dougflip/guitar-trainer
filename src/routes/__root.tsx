import { MainAppShell } from "@/components/layout/MainAppShell";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainAppShell />
    </>
  ),
});
