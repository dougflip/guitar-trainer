import { Container } from "@mantine/core";
import { TrainingCreatePage } from "@/pages/training/TrainingCreate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <Container maw={1000} mx="auto">
      <TrainingCreatePage />
    </Container>
  ),
});
