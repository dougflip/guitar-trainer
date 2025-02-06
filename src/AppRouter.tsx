import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";
import { useState } from "react";

function getRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    basepath: "/guitar-trainer",
    history: createHashHistory(),
    context: { queryClient },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const [router] = useState(() => getRouter(queryClient));

  return <RouterProvider router={router} />;
};
