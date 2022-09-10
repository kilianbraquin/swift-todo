import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewListButton } from "@/components/NewListButton";
import { TodoList } from "@/components/TodoList";
import { TodoListContext } from "@/contexts/TodoListContext";
import { initialTodoLists, todoListsReducer } from "@/reducers/todolists";
import { AnimatePresence } from "framer-motion";
import { useReducer } from "react";

const HomePage = () => {
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
        <AnimatePresence>
          {todoLists.map((todoList) => (
            <TodoList key={todoList.id} todoList={todoList} />
          ))}
        </AnimatePresence>
      </main>
      <Footer />
    </TodoListContext.Provider>
  );
};

export default HomePage;
