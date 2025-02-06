import { MainAppShell } from "@/components/layout/MainAppShell";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

type RootRouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <MainAppShell />
    </>
  ),
});
