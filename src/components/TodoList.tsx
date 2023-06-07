import { FC } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { useUserTasks } from "@/stores/useUserTasks";
import { TodoItem } from "@/components/TodoItem";
import clsx from "clsx";
import { useUserPreferences } from "@/stores/useUserPreferences";

export type TodoListProps = {
  className?: string;
};

export const TodoList: FC<TodoListProps> = ({ className }) => {
  const tasks = useUserTasks((state) => state.tasks);
  const setTasks = useUserTasks((state) => state.setTasks);
  const hideCompletedTasks = useUserPreferences(
    (state) => state.hideCompletedTasks
  );
  return (
    <Reorder.Group
      className={clsx(className, "mx-auto w-full max-w-lg space-y-4")}
      axis="y"
      values={tasks}
      onReorder={(tasks) => {
        setTasks(tasks);
      }}
    >
      <AnimatePresence>
        {tasks
          .filter((task) => !hideCompletedTasks || !task.done)
          .map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
