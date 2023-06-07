import { motion, Reorder } from "framer-motion";
import { FC, useRef, useState } from "react";
import { Task, useUserTasks } from "@/stores/useUserTasks";
import { useAutoFocus } from "@/stores/useAutoFocus";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";
import { TodoCheckbox } from "@/components/TodoCheckbox";
import { TodoMenu } from "@/components/TodoMenu";

export type TodoItemProps = {
  task: Task;
};

export const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const [disableDragging, setDisableDragging] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const autoFocusNewTask = useUserPreferences(
    (state) => state.autoFocusNewTask
  );
  const removeTask = useUserTasks((state) => state.removeTask);
  const toggleTaskStatus = useUserTasks((state) => state.toggleTaskStatus);
  const setTodoTaskField = useUserTasks((state) => state.setTodoTaskField);
  const refNameInput = useRef<HTMLInputElement>(null);
  const autoFocusTaskId = useAutoFocus((state) => state.autoFocusTaskId);

  return (
    <Reorder.Item
      className="outline-main"
      ref={itemRef}
      drag={disableDragging ? false : "y"}
      tabIndex={-1}
      id={task.id}
      value={task}
      onDrag={(e, pan) => {
        if (window.getSelection()?.toString()) {
          setDisableDragging(true);
        } else if (!disableDragging && Math.abs(pan.offset.y) > 1) {
          setIsDragged(true);
          if (itemRef.current && itemRef.current !== document.activeElement) {
            itemRef.current.focus();
          }
        }
      }}
      whileDrag={{
        scale: isDragged ? 0.95 : 1,
      }}
      onDragEnd={() => {
        setIsDragged(false);
        setDisableDragging(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          if (event.shiftKey) {
            itemRef.current?.focus();
            toggleTaskStatus(task.id);
          } else {
            if (document.activeElement === itemRef.current)
              itemRef.current?.blur();
            else itemRef.current?.focus();
          }
        } else if (event.key === " ") {
          refNameInput.current?.focus();
        } else if (event.key === "Backspace" && event.shiftKey) {
          removeTask(task.id);
        }
      }}
    >
      <motion.div
        className="flex cursor-grab items-center gap-2 rounded-md bg-white px-4 py-3 shadow-md active:cursor-grabbing"
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        <TodoCheckbox
          value={task.done !== null}
          setValue={() => toggleTaskStatus(task.id)}
          disabled={isDragged}
        />
        <input
          ref={refNameInput}
          className={clsx(
            "block min-w-0 flex-1 overflow-ellipsis bg-none font-title text-lg font-bold text-neutral-900 outline-none sm:text-xl",
            isDragged && "cursor-grabbing"
          )}
          type="text"
          value={task.name}
          onChange={(e) =>
            setTodoTaskField(task.id, "name", e.currentTarget.value)
          }
          autoFocus={autoFocusNewTask && task.id === autoFocusTaskId}
          placeholder="Name"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              itemRef.current?.focus();
              e.stopPropagation();
            }
          }}
        />
        <TodoMenu />
        {/*<button onClick={() => removeTask(task.id)}>Delete</button>*/}
      </motion.div>
    </Reorder.Item>
  );
};
