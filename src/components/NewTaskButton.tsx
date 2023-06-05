import { motion } from "framer-motion";
import { FC } from "react";
import { useUserTasks } from "@/stores/useUserTasks";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useAutoFocus } from "@/stores/useAutoFocus";
import clsx from "clsx";

export type NewTaskButtonProps = {
  className: string;
};

export const NewTaskButton: FC<NewTaskButtonProps> = ({ className }) => {
  const addTask = useUserTasks((state) => state.addTask);
  const setAutoFocus = useAutoFocus((state) => state.setAutoFocus);

  return (
    <motion.button
      className={clsx(
        className,
        "bg-neutral-900/5 hover:border-neutral-900/30 border-neutral-900/20 border-dashed rounded-md border-2 mx-auto max-w-lg block w-full text-center h-28 text-neutral-700"
      )}
      onClick={() => {
        const newTaskId = addTask();
        setAutoFocus(newTaskId);
      }}
    >
      <PlusIcon className="mx-auto" width={24} />
    </motion.button>
  );
};
