import { motion, Reorder } from "framer-motion";
import { FC, useRef } from "react";
import { Task, useUserTasks } from "@/stores/useUserTasks";
import { useAutoFocus } from "@/stores/useAutoFocus";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";

export type TodoItemProps = {
  task: Task;
};

export const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const autoFocusNewTask = useUserPreferences(
    (state) => state.autoFocusNewTask
  );
  const removeTask = useUserTasks((state) => state.removeTask);
  const setTodoTaskField = useUserTasks((state) => state.setTodoTaskField);
  const refNameInput = useRef<HTMLInputElement>(null);
  const refDescriptionInput = useRef<HTMLInputElement>(null);
  const autoFocusTaskId = useAutoFocus((state) => state.autoFocusTaskId);

  return (
    <Reorder.Item
      ref={itemRef}
      drag="y"
      tabIndex={-1}
      id={task.id}
      value={task}
      onDrag={(e, pan) => {
        if (
          Math.abs(pan.offset.y) > 16 &&
          itemRef.current &&
          itemRef.current !== document.activeElement
        )
          itemRef.current.focus();
      }}
      className="mb-4"
    >
      <motion.div
        className="bg-white px-4 py-3 rounded-md shadow-md cursor-pointer"
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        <input
          ref={refNameInput}
          className={clsx(
            "block bg-none outline-none font-title font-bold text-xl mb-1 text-neutral-900"
          )}
          type="text"
          value={task.name}
          onChange={(e) =>
            setTodoTaskField(task.id, "name", e.currentTarget.value)
          }
          autoFocus={autoFocusNewTask && task.id === autoFocusTaskId}
          placeholder="Name"
          onKeyDown={(event) => {
            if (event.key === "Enter") refDescriptionInput.current?.focus();
          }}
        />
        <input
          ref={refDescriptionInput}
          className={clsx("block bg-none outline-none")}
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
    </Reorder.Item>
  );
};
