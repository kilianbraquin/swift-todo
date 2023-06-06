import { FC } from "react";
import { Reorder } from "framer-motion";
import { useUserTasks } from "@/stores/useUserTasks";
import { TodoItem } from "@/components/TodoItem";
import clsx from "clsx";

export type TodoListProps = {
  className?: string;
};

export const TodoList: FC<TodoListProps> = ({ className }) => {
  const tasks = useUserTasks((state) => state.tasks);
  const setTasks = useUserTasks((state) => state.setTasks);
  return (
    <Reorder.Group
      className={clsx(className, "mx-auto w-full max-w-lg space-y-4")}
      axis="y"
      values={tasks}
      onReorder={(tasks) => {
        setTasks(tasks);
      }}
    >
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </Reorder.Group>
  );
};
