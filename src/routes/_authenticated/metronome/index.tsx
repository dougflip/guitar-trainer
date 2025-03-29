import { Container } from "@mantine/core";
import { Metronome } from "@/pages/metronome/Metronome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/metronome/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maw={1000} mx="auto">
      <Metronome />
    </Container>
  );
}
