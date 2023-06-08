"use client";
import { LayoutGroup, motion } from "framer-motion";
import { TodoList } from "@/components/TodoList";
import { NewTaskButton } from "@/components/NewTaskButton";
import { useUserPreferences } from "@/stores/useUserPreferences";
import clsx from "clsx";
import { Help } from "@/components/Help";
import Link from "next/link";

export const MainTemplate = () => {
  const addTasksOnTop = useUserPreferences((state) => state.addTasksOnTop);

  return (
    <main className="relative mx-4 flex min-h-screen flex-col gap-4 pb-12 pt-24 sm:mx-auto sm:max-w-lg">
      <Help />
      <LayoutGroup>
        <NewTaskButton className={clsx(!addTasksOnTop && "order-2")} />
        <TodoList />
        <motion.div className="absolute inset-x-0 bottom-0 py-2 text-center font-bold text-neutral-600">
          By{" "}
          <Link href="https://www.kbraquin.com/" className="text-primary-dark">
            Kilian Braquin
          </Link>
        </motion.div>
      </LayoutGroup>
    </main>
  );
};

export default MainTemplate;
