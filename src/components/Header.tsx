import SwiftTodoIcon from "@/icons/swift-todo.svg";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="h-16 fixed inset-x-0 z-30 border-b border-neutral-500 top-0 bg-white flex justify-center items-center">
      <SwiftTodoIcon height={40} width={230} />
    </div>
  );
};
