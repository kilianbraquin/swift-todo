"use client";
import { LayoutGroup, motion } from "framer-motion";
import { TodoList } from "@/components/TodoList";
import { NewTaskButton } from "@/components/NewTaskButton";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";

export const MainTemplate = () => {
  // const tasks = useUserTasks((state) => state.tasks);
  const addTasksOnTop = useUserPreferences((state) => state.addTasksOnTop);

  return (
    <main className="container pt-24 pb-12 relative min-h-screen flex flex-col gap-4">
      <LayoutGroup>
        <NewTaskButton className={clsx(!addTasksOnTop && "order-2")} />
        <TodoList />
        <motion.div className="absolute bottom-0 inset-x-0 flex justify-center py-2">
          <div className="font-bold">By IndieBaie</div>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default MainTemplate;
