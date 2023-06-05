"use client";
import { useUserTasks } from "@/stores/useUserTasks";
import { NewTaskButton } from "@/components/NewTaskButton";
import { Footer } from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import { TodoItem } from "@/components/TodoItem";

export const MainTemplate = () => {
  const tasks = useUserTasks((state) => state.tasks);

  return (
    <>
      <main className="container flex flex-col gap-8 items-center pt-24 pb-16 relative min-h-screen">
        <NewTaskButton />
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default MainTemplate;
