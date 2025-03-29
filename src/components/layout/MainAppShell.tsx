import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { Link, Outlet } from "@tanstack/react-router";

import { IconMusic } from "@tabler/icons-react";
import { signOut } from "@/api";
import { useDisclosure } from "@mantine/hooks";

export function MainAppShell() {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  async function handleSignOut() {
    closeMobile();
    await signOut();
  }

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
          <Text size="xl">Guitar Trainer</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          to="/practice-sessions"
          label="My Practice Sessions"
          onClick={closeMobile}
        />
        <NavLink
          component={Link}
          to="/metronome"
          label="Metronome"
          onClick={closeMobile}
        />
        <NavLink label="Sign Out" onClick={handleSignOut} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
