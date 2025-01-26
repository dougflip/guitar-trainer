import { Container } from "@mantine/core";
import { TrainingSessions } from "@/pages/training-sessions/TrainingSessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/training-sessions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <TrainingSessions />
    </Container>
  );
}
