import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import BasicAppShell from "./components/AppShell";

export const metadata = {
  title: "booksCRUD",
  description: "Projekt - wykład monograficzny",
};
/**Layout aplikacji dla projektu wygenerowanego w Next.js
 * Aby umożliwić korzystanie z biblioteki komponentów Mantine,
 * tworzone komponenty obleczone są w znaczniki <Mantine Provider>
 * Dodatkowo wykorzystano BasicAppShell, który zapewnia gotową strukturę,
 * złożoną z nagłówka, nawigacji i części głównej
 */
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
