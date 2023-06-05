export type TodoTask = {
  id: string;
  name: string;
  description: string;
  done: boolean;
};

export type TodoList = {
  tasks: TodoTask[];
};

export type TodoListsState = TodoList;

export enum TodoListsActionType {
  ADD_TODOTASK = "ADD_TODOTASK",
  SET_TODOTASK_FIELD = "SET_TODOTASK_FIELD",
  DELETE_TODOTASK = "DELETE_TODOTASK",
}

export type TodoListsAction =
  | {
      type: TodoListsActionType.ADD_TODOTASK;
    }
  | {
      type: TodoListsActionType.DELETE_TODOTASK;
      payload: {
        listId: string;
      };
    }
  | {
      type: TodoListsActionType.SET_TODOTASK_FIELD;
      payload: {
        listId: string;
        field: "name" | "description";
        value: string;
      };
    };
