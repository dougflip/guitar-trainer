import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "@tanstack/react-router";
import classes from "./PageError.module.css";

type PageErrorProps = {
  refetch?: () => void;
};

export function PageError({ refetch }: PageErrorProps) {
  return (
    <Container className={classes.root}>
      <Title className={classes.title}>Your request enountered an error</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this page failed to load. This is most likely an issue
        loading your data. Please try refeshing the page or visiting a different
        page.
      </Text>
      <Group justify="center">
        <Link to="/">Take me back to home page</Link>
        {refetch && (
          <>
            or
            <Button variant="outline" onClick={refetch}>
              Try the request again
            </Button>
          </>
        )}
      </Group>
    </Container>
  );
}
