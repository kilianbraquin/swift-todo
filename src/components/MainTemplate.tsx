import { LayoutGroup, motion } from "framer-motion";
import { TodoList } from "@/components/TodoList.tsx";
import { NewTaskButton } from "@/components/NewTaskButton.tsx";
import { useUserPreferences } from "@/stores/useUserPreferences.ts";
import clsx from "clsx";
import { Help } from "@/components/Help.tsx";
import { useUserTasks } from "@/stores/useUserTasks.ts";

export const MainTemplate = () => {
  const addTasksOnTop = useUserPreferences((state) => state.addTasksOnTop);
  const tasks = useUserTasks((state) => state.tasks);

  return (
    <main
      className={clsx(
        "relative mx-4 flex min-h-screen flex-col pb-12 pt-24 sm:mx-auto sm:max-w-lg",
        tasks.length > 0 && "gap-4",
      )}
    >
      <Help />
      <LayoutGroup>
        <NewTaskButton className={clsx(!addTasksOnTop && "order-2")} />
        <TodoList />
        <motion.div className="absolute inset-x-0 bottom-0 py-2 text-center font-title font-bold text-neutral-600">
          By{" "}
          <a href="https://www.kbraquin.com/" className="text-primary-dark">
            Kilian Braquin
          </a>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default MainTemplate;
