import { Metadata, NextPage } from "next";
import { Template } from "@/components/Template";

const HomePage: NextPage = () => {
  return <Template />;
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default HomePage;
