"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconBooks, IconList, IconPlus } from "@tabler/icons-react";

export default function BasicAppShell({ children }: any) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xs"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <IconBooks height="32" width="32" stroke="1.25" />
          <Title order={3}>booksCRUD</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Button
          leftSection={<IconList size={24} />}
          variant="subtle"
          color="dark"
          size="md"
          justify="flex-start"
          fullWidth
        >
          Wszystkie książki
        </Button>
        <Button
          leftSection={<IconPlus size={24} />}
          variant="subtle"
          color="dark"
          size="md"
          justify="flex-start"
          fullWidth
        >
          Dodaj książkę
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
