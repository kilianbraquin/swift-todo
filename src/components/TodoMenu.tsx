import { FC } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export const TodoMenu: FC = () => {
  return (
    <>
      <button>
        <EllipsisHorizontalIcon height={24} />
      </button>
    </>
  );
};
