import { FC, useEffect, useRef, useState } from "react";
import SettingsIcon from "@heroicons/react/24/outline/Cog8ToothIcon";
import { offset, useFloating } from "@floating-ui/react-dom";
import { HeaderCheckbox } from "@/components/HeaderCheckbox";
import { useUserPreferences } from "@/stores/useUserPreferences";
import { useUserTasks } from "@/stores/useUserTasks";
import {
  ArrowPathRoundedSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export const HeaderMenu: FC = () => {
  const refMenu = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const removeAllTasks = useUserTasks((state) => state.removeAllTasks);
  const sortTasks = useUserTasks((state) => state.sortTasks);
  const {
    addTasksOnTop,
    setAddTasksOnTop,
    autoFocusNewTask,
    setAutoFocusNewTask,
    hideCompletedTasks,
    setHideCompletedTasks,
  } = useUserPreferences();
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-end",
    middleware: [offset({ mainAxis: 12, crossAxis: 9 })],
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !refMenu.current?.contains(e.target)) {
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
      onBlur={(e) => {
        if (!refMenu.current?.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={refs.setReference}
        className="rounded-md p-2 hover:bg-neutral-900/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SettingsIcon width={24}></SettingsIcon>
      </button>
      {isOpen && (
        <div
          className="rounded-md border border-neutral-900/20 bg-white p-4 text-neutral-600 shadow"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <ul>
            <li>
              <HeaderCheckbox
                label="Add tasks on top"
                value={addTasksOnTop}
                setValue={setAddTasksOnTop}
              />
            </li>
            <li>
              <HeaderCheckbox
                label="Auto focus new tasks"
                value={autoFocusNewTask}
                setValue={setAutoFocusNewTask}
              />
            </li>
            <li>
              <HeaderCheckbox
                label="Hide completed tasks"
                value={hideCompletedTasks}
                setValue={setHideCompletedTasks}
              />
            </li>
            <li>
              <button
                className="flex items-center gap-1.5 p-px"
                onClick={() => {
                  sortTasks("addedDate");
                  setIsOpen(false);
                }}
              >
                <ArrowPathRoundedSquareIcon height={16} />
                Sort by added date
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-1.5 p-px"
                onClick={() => {
                  sortTasks("completedDate");
                  setIsOpen(false);
                }}
              >
                <ArrowPathRoundedSquareIcon height={16} />
                Sort by completed date
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-1.5 p-px font-semibold text-danger-600 hover:text-danger-700"
                onClick={() => {
                  removeAllTasks();
                  setIsOpen(false);
                }}
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
