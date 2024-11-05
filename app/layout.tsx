import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css';
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";
import '@mantine/carousel/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-Science",
  description: "A scienific platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-800 min-h-screen m-0`}>
        <QueryClientProvider>
          <MantineProvider>{children}</MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
