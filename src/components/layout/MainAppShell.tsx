import { AppShell, Burger, Group, Text } from "@mantine/core";

import { IconMusic } from "@tabler/icons-react";
import { Outlet } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";

export function MainAppShell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header bg="blue">
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <IconMusic size={30} />
          <Text size="xl">Master Shredder</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar bg="blue" p="md">
        Navbar
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}