import {
  TodoListsAction,
  TodoListsActionType,
} from "@/reducers/todolists/types";

export function addTodoTask(): TodoListsAction {
  return {
    type: TodoListsActionType.ADD_TODOTASK,
  };
}

export function deleteTodoTask(listId: string): TodoListsAction {
  return {
    type: TodoListsActionType.DELETE_TODOTASK,
    payload: {
      listId,
    },
  };
}

export function setTodoTaskField(
  listId: string,
  field: "name" | "description",
  value: string
): TodoListsAction {
  return {
    type: TodoListsActionType.SET_TODOTASK_FIELD,
    payload: {
      listId,
      field,
      value,
    },
  };
}
