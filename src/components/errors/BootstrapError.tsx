import { Center, Container, Text, Title } from "@mantine/core";

export function BootstrapError() {
  return (
    <Container maw={1000} mx="auto" my="xl">
      <Center>
        <Title>Uh oh! There was an error bootstraping the app</Title>
      </Center>
      <Text c="dimmed" size="lg" ta="center">
        Please try refreshing the page.
      </Text>
    </Container>
  );
}
