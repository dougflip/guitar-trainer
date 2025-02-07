import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AuthState } from "@/core/auth";
import { BootstrapError } from "@/components/errors/BootstrapError";
import { refreshSession } from "@/api";
import { routeTree } from "@/routeTree.gen";

type BootstrapStatus =
  | { kind: "loading" }
  | { kind: "loaded"; auth: AuthState }
  | { kind: "error"; error: Error };

function getRouter(
  queryClient: QueryClient,
  auth: AuthState,
  setAuth: (auth: AuthState) => void,
) {
  return createRouter({
    routeTree,
    basepath: "/guitar-trainer",
    history: createHashHistory(),
    context: { queryClient, auth, setAuth },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

/**
 * Top level component that determines initial auth status and sets up the router.
 *
 * Basically, the goal of this component is to determine if the user is authenticated
 * and then set up the router with the appropriate context.
 */
export const AppRouter = () => {
  const [bootData, setBootData] = useState<BootstrapStatus>({
    kind: "loading",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    async function boot() {
      const { data, error } = await refreshSession();

      if (error) {
        console.error("error bootstrapping app", error);
        setBootData({ kind: "error", error });
        return;
      }

      if (data.user) {
        setBootData({
          kind: "loaded",
          auth: { kind: "authenticated", user: data.user },
        });
        return;
      }

      setBootData({ kind: "loaded", auth: { kind: "unauthenticated" } });
    }

    boot();
  }, []);

  if (bootData.kind === "loading") {
    return null;
  }

  if (bootData.kind === "error") {
    return <BootstrapError />;
  }

  return (
    <RouterProvider
      router={getRouter(queryClient, bootData.auth, (auth: AuthState) => {
        setBootData({ kind: "loaded", auth });
      })}
    />
  );
};
