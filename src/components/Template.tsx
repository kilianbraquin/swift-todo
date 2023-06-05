"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TodoListContext } from "@/contexts/TodoListContext";
import { initialTodoLists, todoListsReducer } from "@/reducers/todolists";
import { useReducer } from "react";
import { NewTaskButton } from "@/components/NewTaskButton";
import { AnimatePresence } from "framer-motion";
import { TodoItem } from "@/components/TodoItem";

export const Template = () => {
  const [{ tasks }, todoListsDispatch] = useReducer(
    todoListsReducer,
    initialTodoLists
  );

  return (
    <TodoListContext.Provider
      value={{
        tasks,
        todoListsDispatch,
      }}
    >
      <Header />
      <main className="container flex flex-col gap-8 items-center pt-24 pb-16 relative min-h-screen">
        <NewTaskButton />
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </main>
      <Footer />
    </TodoListContext.Provider>
  );
};
