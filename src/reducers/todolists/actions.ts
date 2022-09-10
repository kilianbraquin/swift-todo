import {
  TodoListsAction,
  TodoListsActionType,
} from "@/reducers/todolists/types";

export function addTodoList(): TodoListsAction {
  return {
    type: TodoListsActionType.ADD_TODOLIST,
  };
}

export function deleteTodoList(listId: string): TodoListsAction {
  return {
    type: TodoListsActionType.DELETE_TODOLIST,
    payload: {
      listId,
    },
  };
}

export function addTodoTask(listId: string): TodoListsAction {
  return {
    type: TodoListsActionType.ADD_TODOTASK,
    payload: {
      listId,
    },
  };
}

export function setTodoListField(
  listId: string,
  field: "name" | "description",
  value: string
): TodoListsAction {
  return {
    type: TodoListsActionType.SET_TODOLIST_FIELD,
    payload: {
      listId,
      field,
      value,
    },
  };
}
