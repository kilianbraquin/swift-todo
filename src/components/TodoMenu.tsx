import { FC } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export const TodoMenu: FC = () => {
  return (
    <>
      <button
        onClick={() => alert("e")}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.stopPropagation();
        }}
      >
        <EllipsisHorizontalIcon height={24} />
      </button>
    </>
  );
};
