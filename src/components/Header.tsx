import SwiftTodoIcon from "@/icons/swift.svg";
import { FC } from "react";
import { HeaderMenu } from "@/components/HeaderMenu";

export const Header: FC = () => {
  return (
    <div className="h-16 fixed z-30 max-w-lg w-full pr-2 -translate-x-1/2 left-1/2 border rounded-md border-neutral-900/20 shadow top-4 bg-white/95 flex justify-between px-4 items-center">
      <SwiftTodoIcon height={40} className="-translate-y-0.5" />
      <HeaderMenu />
    </div>
  );
};
