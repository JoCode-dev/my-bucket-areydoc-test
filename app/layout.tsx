import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "@/providers/ModalProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const poppins = Poppins({ weight: ["300"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "My Bucket - AreyDoc",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem>
          <Theme>
            <ModalProvider>
              <SpeedInsights />
              {children}
            </ModalProvider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
