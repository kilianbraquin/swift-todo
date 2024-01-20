import "@/styles/globals.css";
import { FC, PropsWithChildren } from "react";
import { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import clsx from "clsx";
import { Header } from "@/components/Header";
import { Zustand } from "@/components/Zustand";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Swift Todo",
  description:
    "Prototype of a web application based on React and Framer Motion that lets you manage a simple to-do list",
  metadataBase: new URL("https://swift.kbraquin.com"),
};

export const viewport: Viewport = {
  themeColor: "#98D4F3",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={clsx(inter.variable, nunito.variable)}>
      <body>
        <Zustand />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
