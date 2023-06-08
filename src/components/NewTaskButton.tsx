import { motion } from "framer-motion";
import { FC } from "react";
import { useUserTasks } from "@/stores/useUserTasks";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useAutoFocus } from "@/stores/useAutoFocus";
import clsx from "clsx";

export type NewTaskButtonProps = {
  className?: string;
};

export const NewTaskButton: FC<NewTaskButtonProps> = ({ className }) => {
  const addTask = useUserTasks((state) => state.addTask);
  const setAutoFocus = useAutoFocus((state) => state.setAutoFocus);

  return (
    <motion.button
      className={clsx(
        className,
        "mx-auto block h-16 w-full max-w-lg rounded-md border-2 border-dashed border-neutral-900/20 bg-neutral-900/5 hover:border-neutral-900/30"
      )}
      onClick={() => {
        const newTaskId = addTask();
        setAutoFocus(newTaskId);
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <PlusIcon className="mx-auto" width={24} />
    </motion.button>
  );
};
