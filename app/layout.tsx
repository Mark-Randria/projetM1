import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-Science",
  description: "A scienific platform or something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <MantineProvider>{children}</MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
