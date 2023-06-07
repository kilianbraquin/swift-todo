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
  title: "Swift Todo",
  description: "Simple React Todo App",
  metadataBase: new URL("https://swift.kbraquin.com"),
  themeColor: "#98D4F3",
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
