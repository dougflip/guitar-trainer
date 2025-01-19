import "./index.css";
import "@mantine/core/styles.css";

import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";

import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: "/guitar-trainer",
  history: createHashHistory(),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>,
  );
}
