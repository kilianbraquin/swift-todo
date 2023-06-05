import "@/styles/globals.css";
import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import clsx from "clsx";
import { Header } from "@/components/Header";
import { Zustand } from "@/components/Zustand";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kilian Braquin",
  description:
    "Hello, I'm a full-stack developer that mainly creates websites based on TypeScript, Next.js, React.",
  metadataBase: new URL("https://www.kbraquin.com"),
  themeColor: "#18181B",
  openGraph: {
    title: "Kilian Braquin",
    description:
      "Hello, I'm a full-stack developer that mainly creates websites based on TypeScript, Next.js, React.",
    url: "https://www.kbraquin.com",
    siteName: "Kilian Braquin",
    images: [
      {
        url: "https://www.kbraquin.com/images/logo.png",
        width: 1840,
        height: 1840,
        alt: "Kilian Braquin Logo",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en-US",
  },
  twitter: {
    site: "@kbraquin",
    card: "summary_large_image",
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={clsx(inter.className, nunito.className)}>
      <body>
        <Zustand />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
