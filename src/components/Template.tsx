"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TodoListContext } from "@/contexts/TodoListContext";
import { initialTodoLists, todoListsReducer } from "@/reducers/todolists";
import { useReducer } from "react";
import { NewListButton } from "@/components/NewListButton";
import { AnimatePresence } from "framer-motion";
import { TodoList } from "@/components/TodoList";

export const Template = () => {
  const [{ todoLists }, todoListsDispatch] = useReducer(
    todoListsReducer,
    initialTodoLists
  );

  return (
    <TodoListContext.Provider
      value={{
        todoLists,
        todoListsDispatch,
      }}
    >
      <Header />
      <main className="container flex flex-col gap-8 items-center pt-24 pb-16 relative min-h-screen">
        <NewListButton />
        <AnimatePresence mode="popLayout">
          {todoLists.map((todoList) => (
            <TodoList key={todoList.id} todoList={todoList} />
          ))}
        </AnimatePresence>
      </main>
      <Footer />
    </TodoListContext.Provider>
  );
};
