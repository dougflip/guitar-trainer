import { Container } from "@mantine/core";
import { TrainingSessionPlay } from "@/pages/training-sessions/TrainingSessionPlay";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/training-sessions/$id/play")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <TrainingSessionPlay />
    </Container>
  );
}
