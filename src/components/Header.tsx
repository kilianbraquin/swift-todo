import SwiftTodoIcon from "@/icons/search-icon.svg";
import { useScroll } from "framer-motion";
import { FC, useEffect, useState } from "react";

export const Header: FC = () => {
  const { scrollY } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setScrollPosition(scrollY.get());
    return scrollY.onChange((latest) => {
      console.log("called");
      setScrollPosition(latest);
    });
  }, []);

  return (
    <div className="h-16 sticky border-b border-neutral-500 top-0 bg-white flex justify-center items-center">
      <SwiftTodoIcon height={40} width={230} />
    </div>
  );
};
