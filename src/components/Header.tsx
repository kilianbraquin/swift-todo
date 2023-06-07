import SwiftTodoIcon from "@/icons/swift.svg";
import { FC } from "react";
import { HeaderMenu } from "@/components/HeaderMenu";

export const Header: FC = () => {
  return (
    <div className="fixed left-1/2 top-4 z-30 flex h-16 w-header max-w-lg -translate-x-1/2 items-center justify-between rounded-md border border-neutral-900/20 bg-white/95 px-4 pr-2 shadow">
      <SwiftTodoIcon height={40} className="-translate-y-0.5" />
      <HeaderMenu />
    </div>
  );
};
