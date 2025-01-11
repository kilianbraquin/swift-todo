import { FC } from "react";
import { Header } from "@/components/Header.tsx";
import MainTemplate from "@/components/MainTemplate.tsx";

const App: FC = () => {
  return (
    <>
      <Header />
      <MainTemplate />
    </>
  );
};

export default App;
