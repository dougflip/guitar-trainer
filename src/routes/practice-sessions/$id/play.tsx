import { Container } from "@mantine/core";
import { PracticeSessionPlay } from "@/pages/pratice-sessions/PracticeSessionPlay";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/practice-sessions/$id/play")({
  params: {
    parse: (params) => {
      return {
        id: parseInt(params.id),
      };
    },
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
