import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import BackgroundManager from "./components/BackgroundManager";
import ThemeSwitcher from "./components/ThemeSwitcher";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Wrap 2025",
  description: "Your year in code, wrapped.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <BackgroundManager />
          <ThemeSwitcher />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
