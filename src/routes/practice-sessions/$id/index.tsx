import { Container } from "@mantine/core";
import { PracticeSessionEditPage } from "@/pages/pratice-sessions/PracticeSessionEdit";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/practice-sessions/$id/")({
  params: {
    parse: z.object({
      id: z.string().transform((val) => parseInt(val)),
    }).parse,
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <PracticeSessionEditPage />
    </Container>
  );
}
