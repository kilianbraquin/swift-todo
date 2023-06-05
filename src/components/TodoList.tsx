import { FC } from "react";
import { Reorder } from "framer-motion";
import { useUserTasks } from "@/stores/useUserTasks";
import { TodoItem } from "@/components/TodoItem";

export const TodoList: FC = () => {
  const tasks = useUserTasks((state) => state.tasks);
  const setTasks = useUserTasks((state) => state.setTasks);
  return (
    <Reorder.Group
      className="max-w-lg w-full flex flex-col mx-auto"
      axis="y"
      values={tasks}
      onReorder={(tasks) => setTasks(tasks)}
    >
      {tasks.map((task) => (
        <Reorder.Item key={task.id} value={task}>
          <TodoItem task={task} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
