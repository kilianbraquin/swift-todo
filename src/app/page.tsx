import { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";

const MainTemplate = dynamic(() => import("@/components/MainTemplate"), {
  ssr: false,
});

const HomePage: NextPage = () => <MainTemplate />;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default HomePage;
