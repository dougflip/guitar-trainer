import { Container } from "@mantine/core";
import { TrainingSessionCreatePage } from "@/pages/training-sessions/TrainingSessionCreate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <Container maw={1000} mx="auto">
      <TrainingSessionCreatePage />
    </Container>
  ),
});
