import { Container } from "@mantine/core";
import { PraticeSessionCreatePage } from "@/pages/pratice-sessions/PracticeSessionCreate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/practice-sessions/create")({
  component: () => (
    <Container maw={1000} mx="auto">
      <PraticeSessionCreatePage />
    </Container>
  ),
});
