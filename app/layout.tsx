import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

import Providers from "./config/providers/providers";
import SnackbarProviderClient from "./config/providers/SnackbarProvider";

export const metadata: Metadata = {
  title: "Policia Chubut SRMP",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SnackbarProviderClient>
          <Providers>{children}</Providers>
        </SnackbarProviderClient>
      </body>
    </html>
  );
}
