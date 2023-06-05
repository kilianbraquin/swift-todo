import { TodoList, TodoListsAction } from "@/reducers/todolists/types";
import { createContext, Dispatch } from "react";

export type TodoListContextProps = TodoList & {
  todoListsDispatch: Dispatch<TodoListsAction>;
};

export const TodoListContext = createContext<TodoListContextProps>({
  tasks: [],
  todoListsDispatch: () => null,
});
