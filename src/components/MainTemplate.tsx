"use client";
import { LayoutGroup, motion } from "framer-motion";
import { TodoList } from "@/components/TodoList";
import { NewTaskButton } from "@/components/NewTaskButton";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";

export const MainTemplate = () => {
  const addTasksOnTop = useUserPreferences((state) => state.addTasksOnTop);

  return (
    <main className="container pt-24 pb-16 relative min-h-screen flex flex-col">
      <LayoutGroup>
        <NewTaskButton
          className={clsx(!addTasksOnTop ? "order-2 mt-4" : "mb-4")}
        />
        <TodoList />
        <motion.div className="absolute bottom-0 inset-x-0 flex justify-center py-2">
          <div className="font-bold">By IndieBaie</div>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default MainTemplate;
