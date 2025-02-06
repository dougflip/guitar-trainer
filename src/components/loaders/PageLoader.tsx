import { Container, Flex, Loader, Title } from "@mantine/core";

import { ReactNode } from "react";

type PageLoaderProps = {
  title?: ReactNode;
};

export function PageLoader({ title }: PageLoaderProps) {
  return (
    <Container maw={1000} mx="auto">
      <Flex justify="center" align="center" direction="column">
        {title && (
          <Title mb="lg" order={3}>
            {title}
          </Title>
        )}
        <Loader size="lg" />
      </Flex>
    </Container>
  );
}
