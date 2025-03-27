import "./index.css";
import "@mantine/core/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "@/AppRouter";
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </QueryClientProvider>,
    // </StrictMode>,
  );
}
