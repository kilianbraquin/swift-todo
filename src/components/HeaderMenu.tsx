"use client";
import { FC, useEffect, useRef, useState } from "react";
import SettingsIcon from "@heroicons/react/24/outline/Cog8ToothIcon";
import { motion } from "framer-motion";
import { offset, useFloating } from "@floating-ui/react-dom";
import { Checkbox } from "@/components/Checkbox";
import { useUserPreferences } from "@/stores/useUserPreferences";
import { useUserTasks } from "@/stores/useUserTasks";
import { TrashIcon } from "@heroicons/react/24/solid";

export const HeaderMenu: FC = () => {
  const refMenu = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const removeAllTasks = useUserTasks((state) => state.removeAllTasks);
  const {
    addTasksOnTop,
    setAddTasksOnTop,
    autoFocusNewTask,
    setAutoFocusNewTask,
  } = useUserPreferences();
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-end",
    middleware: [offset({ mainAxis: 12, crossAxis: 9 })],
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
    <div ref={refMenu}>
      <motion.button
        ref={refs.setReference}
        className="rounded-md p-2 hover:bg-neutral-900/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SettingsIcon width={24}></SettingsIcon>
      </motion.button>
      {isOpen && (
        <div
          className="rounded-md border border-neutral-900/20 bg-white p-4 shadow"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <ul>
            <li>
              <Checkbox
                label="Add tasks on top"
                value={addTasksOnTop}
                setValue={setAddTasksOnTop}
              />
            </li>
            <li>
              <Checkbox
                label="Auto focus new tasks"
                value={autoFocusNewTask}
                setValue={setAutoFocusNewTask}
              />
            </li>
            <li>
              <button
                className="flex items-center gap-1.5 p-px font-bold text-danger-600"
                onClick={removeAllTasks}
              >
                <TrashIcon height={16} className="-translate-y-px" />
                Remove All Tasks
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
