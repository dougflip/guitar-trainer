import { Container } from "@mantine/core";
import { TrainingSessionEditPage } from "@/pages/training-sessions/TrainingSessionEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/training-sessions/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <TrainingSessionEditPage />
    </Container>
  );
}
