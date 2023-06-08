import { FC, useEffect, useRef, useState } from "react";
import {
  BackspaceIcon,
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { offset, useFloating } from "@floating-ui/react-dom";
import { Task, useUserTasks } from "@/stores/useUserTasks";
import { useAutoFocus } from "@/stores/useAutoFocus";

export type TodoMenuProps = {
  task: Task;
};

export const TodoMenu: FC<TodoMenuProps> = ({ task }) => {
  const refMenu = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const setAutoFocus = useAutoFocus((state) => state.setAutoFocus);
  const duplicateTask = useUserTasks((state) => state.duplicateTask);
  const removeTask = useUserTasks((state) => state.removeTask);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-end",
    middleware: [offset({ mainAxis: 14, crossAxis: 16 })],
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!refMenu.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  return (
    <div
      ref={refMenu}
      className="leading-[0]"
      onBlur={(e) => {
        if (!refMenu.current?.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.stopPropagation();
        }}
      >
        <EllipsisHorizontalIcon height={24} />
      </button>
      {isOpen && (
        <div
          className="rounded-md border border-neutral-900/20 bg-white p-4 shadow"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <ul className="flex flex-col gap-1.5">
            <li>
              <button
                className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-700"
                onClick={() => {
                  const newTaskId = duplicateTask(task.id);
                  if (newTaskId) setAutoFocus(newTaskId);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.stopPropagation();
                }}
              >
                <DocumentDuplicateIcon height={16} />
                Duplicate
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-1.5 font-bold text-danger-600 hover:text-danger-700"
                onClick={() => {
                  removeTask(task.id);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.stopPropagation();
                }}
              >
                <BackspaceIcon height={16} />
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
