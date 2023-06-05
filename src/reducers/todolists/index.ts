import {
  TodoListsAction,
  TodoListsActionType,
  TodoListsState,
  TodoTask,
} from "@/reducers/todolists/types";
import { Reducer } from "react";

function generateItemId() {
  return (
    Math.random().toString().substring(2, 15) +
    Math.random().toString().substring(2, 15)
  );
}

export const initialTodoLists: TodoListsState = {
  tasks: [],
};

export const todoListsReducer: Reducer<TodoListsState, TodoListsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case TodoListsActionType.ADD_TODOTASK: {
      const newTodoTask: TodoTask = {
        id: generateItemId(),
        name: "New TodoList",
        description: "",
        done: false,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTodoTask],
      };
    }
    case TodoListsActionType.DELETE_TODOTASK: {
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== action.payload.listId),
      };
    }
    case TodoListsActionType.SET_TODOTASK_FIELD: {
      const todoList = state.tasks.find(
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
