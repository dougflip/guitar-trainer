import { Container } from "@mantine/core";
import { PracticeSessionEditPage } from "@/pages/pratice-sessions/PracticeSessionEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/practice-sessions/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <PracticeSessionEditPage />
    </Container>
  );
}
