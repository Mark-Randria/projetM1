import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "./globals.css";

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
      <body className={`${inter.className} bg-gray-100 text-gray-800 h-screen`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
