import { motion, Reorder, usePresence } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { Task, useUserTasks } from "@/stores/useUserTasks";
import { useAutoFocus } from "@/stores/useAutoFocus";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";
import { TodoCheckbox } from "@/components/TodoCheckbox";
import { TodoMenu } from "@/components/TodoMenu";
import { TodoInput } from "@/components/TodoInput";

export type TodoItemProps = {
  task: Task;
};

export const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [disableDragging, setDisableDragging] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const autoFocusNewTask = useUserPreferences(
    (state) => state.autoFocusNewTask,
  );
  const moveTaskUp = useUserTasks((state) => state.moveTaskUp);
  const moveTaskDown = useUserTasks((state) => state.moveTaskDown);
  const isExistingTask = useUserTasks((state) => state.isExistingTask);
  const removeTask = useUserTasks((state) => state.removeTask);
  const toggleTaskStatus = useUserTasks((state) => state.toggleTaskStatus);
  const setTodoTaskField = useUserTasks((state) => state.setTodoTaskField);
  const refNameInput = useRef<HTMLInputElement>(null);
  const autoFocusTaskId = useAutoFocus((state) => state.autoFocusTaskId);

  useEffect(() => {
    if (!isPresent) setTimeout(safeToRemove, 1000);
  }, [safeToRemove, isPresent]);

  useEffect(() => {
    const element = itemRef.current;
    if (element) {
      const onKeyDown = (event: KeyboardEvent): void => {
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
          event.preventDefault();
        } else if (event.key === "ArrowUp" && event.altKey) {
          moveTaskUp(task.id);
        } else if (event.key === "ArrowDown" && event.altKey) {
          moveTaskDown(task.id);
        }
      };

      element.addEventListener("keydown", onKeyDown);
      return () => {
        element.removeEventListener("keydown", onKeyDown);
      };
    }
  }, []);

  return (
    <Reorder.Item
      ref={itemRef}
      drag={disableDragging ? false : "y"}
      tabIndex={-1}
      id={task.id}
      value={task}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
      onDrag={(_, pan) => {
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
          deleted={!isExistingTask(task.id)}
          disabled={isDragged}
        />
        <TodoInput
          ref={refNameInput}
          completed={task.done !== null}
          className={clsx("min-w-0 flex-1", isDragged && "cursor-grabbing")}
          onChange={(newValue) => setTodoTaskField(task.id, "name", newValue)}
          autoFocus={autoFocusNewTask && task.id === autoFocusTaskId}
          placeholder="Name"
          defaultValue={task.name}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              itemRef.current?.focus();
              e.stopPropagation();
            }
          }}
        />
        <TodoMenu task={task} />
      </motion.div>
    </Reorder.Item>
  );
};
