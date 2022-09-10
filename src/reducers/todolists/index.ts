import {
  TodoList,
  TodoListsAction,
  TodoListsActionType,
  TodoListsState,
} from "@/reducers/todolists/types";
import { Reducer } from "react";

function generateItemId() {
  return (
    Math.random().toString().substring(2, 15) +
    Math.random().toString().substring(2, 15)
  );
}

export const initialTodoLists: TodoListsState = {
  todoLists: [],
};

export const todoListsReducer: Reducer<TodoListsState, TodoListsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case TodoListsActionType.ADD_TODOLIST: {
      const newTodoList: TodoList = {
        id: generateItemId(),
        name: "New TodoList",
        description: "",
        tasks: [],
      };
      return {
        ...state,
        todoLists: [...state.todoLists, newTodoList],
      };
    }
    case TodoListsActionType.DELETE_TODOLIST: {
      return {
        ...state,
        todoLists: state.todoLists.filter(
          ({ id }) => id !== action.payload.listId
        ),
      };
    }
    case TodoListsActionType.SET_TODOLIST_FIELD: {
      const todoList = state.todoLists.find(
        ({ id }) => id === action.payload.listId
      );
      if (todoList) {
        todoList[action.payload.field] = action.payload.value;
      }
      return {
        ...state,
      };
    }
    default:
      throw new Error();
  }
};
