import { Container } from "@mantine/core";
import { PracticeSessions } from "@/pages/pratice-sessions/PracticeSessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/practice-sessions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <PracticeSessions />
    </Container>
  );
}
