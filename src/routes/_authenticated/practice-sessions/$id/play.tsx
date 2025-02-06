import { Container } from "@mantine/core";
import { PracticeSessionPlay } from "@/pages/pratice-sessions/PracticeSessionPlay";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute(
  "/_authenticated/practice-sessions/$id/play",
)({
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
      <PracticeSessionPlay />
    </Container>
  );
}
