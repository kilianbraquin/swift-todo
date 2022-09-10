import { TodoList, TodoListsAction } from "@/reducers/todolists/types";
import { createContext, Dispatch } from "react";

export type TodoListContextProps = {
  todoLists: TodoList[];
  todoListsDispatch: Dispatch<TodoListsAction>;
};

export const TodoListContext = createContext<TodoListContextProps>({
  todoLists: [],
  todoListsDispatch: () => null,
});
