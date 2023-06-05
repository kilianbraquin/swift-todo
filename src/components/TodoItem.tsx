import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { Task, useUserTasks } from "@/stores/useUserTasks";

export type TodoItemProps = {
  task: Task;
};

export const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const removeTask = useUserTasks((state) => state.removeTask);
  const setTodoTaskField = useUserTasks((state) => state.setTodoTaskField);
  const refNameInput = useRef<HTMLInputElement>(null);
  const refDescriptionInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refNameInput.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      layout
      drag="y"
      dragMomentum={false}
      className="bg-white max-w-xl w-full px-4 py-3 rounded-md shadow-md"
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <input
        ref={refNameInput}
        className="block bg-none outline-none font-title font-bold text-xl mb-1 text-neutral-900"
        type="text"
        value={task.name}
        onChange={(e) =>
          setTodoTaskField(task.id, "name", e.currentTarget.value)
        }
        placeholder="Name"
        autoFocus={true}
        onKeyDown={(event) => {
          if (event.key === "Enter") refDescriptionInput.current?.focus();
        }}
      />
      <input
        ref={refDescriptionInput}
        className="block bg-none outline-none"
        type="text"
        value={task.description}
        onChange={(e) =>
          setTodoTaskField(task.id, "description", e.currentTarget.value)
        }
        placeholder="Description"
        onKeyDown={(event) => {
          if (event.key === "Enter") refDescriptionInput.current?.blur();
        }}
      />
      <button onClick={() => removeTask(task.id)}>Delete</button>
    </motion.div>
  );
};
