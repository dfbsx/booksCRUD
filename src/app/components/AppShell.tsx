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
import { useRouter } from "next/navigation";

export default function BasicAppShell({ children }: any) {
  //komponent AppShell z biblioteki Mantine
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xs"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
          onClick={() => router.push("/")}
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
          onClick={() => router.push("/new")}
        >
          Dodaj książkę
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
