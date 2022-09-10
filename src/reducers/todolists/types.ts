export type TodoTask = {
  id: string;
  label: string;
  done: boolean;
};

export type TodoList = {
  id: string;
  name: string;
  description: string;
  tasks: TodoTask[];
};

export type TodoListsState = {
  todoLists: TodoList[];
};

export enum TodoListsActionType {
  ADD_TODOLIST = "ADD_TODOLIST",
  ADD_TODOTASK = "ADD_TODOTASK",
  SET_TODOLIST_FIELD = "SET_TODOLIST_FIELD",
  DELETE_TODOLIST = "DELETE_TODOLIST",
}

export type TodoListsAction =
  | {
      type: TodoListsActionType.ADD_TODOLIST;
    }
  | {
      type: TodoListsActionType.DELETE_TODOLIST;
      payload: {
        listId: string;
      };
    }
  | {
      type: TodoListsActionType.ADD_TODOTASK;
      payload: {
        listId: string;
      };
    }
  | {
      type: TodoListsActionType.SET_TODOLIST_FIELD;
      payload: {
        listId: string;
        field: "name" | "description";
        value: string;
      };
    };
