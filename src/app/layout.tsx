import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import BasicAppShell from "./components/AppShell";

export const metadata = {
  title: "booksCRUD",
  description: "Projekt - wykład monograficzny",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider><BasicAppShell children={children}/></MantineProvider>
      </body>
    </html>
  );
}
