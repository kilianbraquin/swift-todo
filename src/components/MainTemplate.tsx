"use client";
import { LayoutGroup, motion } from "framer-motion";
import { TodoList } from "@/components/TodoList";
import { NewTaskButton } from "@/components/NewTaskButton";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";

export const MainTemplate = () => {
  const addTasksOnTop = useUserPreferences((state) => state.addTasksOnTop);

  return (
    <main className="container relative flex min-h-screen flex-col gap-4 pb-12 pt-24">
      <LayoutGroup>
        <NewTaskButton className={clsx(!addTasksOnTop && "order-2")} />
        <TodoList />
        <motion.div className="absolute inset-x-0 bottom-0 flex justify-center py-2">
          <div className="font-bold">By Kilian Braquin</div>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default MainTemplate;
