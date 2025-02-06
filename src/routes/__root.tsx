import { AuthState } from "@/core/auth";
import { MainAppShell } from "@/components/layout/MainAppShell";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

type RootRouteContext = {
  queryClient: QueryClient;
  auth: AuthState;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <MainAppShell />
    </>
  ),
});
