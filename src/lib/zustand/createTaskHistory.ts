import { createStore, StoreApi } from "zustand";
import { State as UserTasksState } from "@/stores/useUserTasks";

export type TaskHistoryState = {
  past: UserTasksState[];
  future: UserTasksState[];
};

export type TaskHistoryAction = {
  undo: () => void;
  redo: () => void;
  savePreviousState: (previousState: UserTasksState) => void;
};

export type TaskHistoryStoreProps = TaskHistoryState & TaskHistoryAction;

export const reduceUserTasksState = <T extends UserTasksState>(
  state
): UserTasksState => JSON.parse(JSON.stringify(state)); // The easiest way to deep copy and ignore functions

export const createTaskHistory = (
  userTasksSet: StoreApi<UserTasksState>["setState"],
  userTasksGet: StoreApi<UserTasksState>["getState"]
) => {
  return createStore<TaskHistoryStoreProps>((set, get) => ({
    past: [],
    future: [],
    undo: () => {
      const currentState = reduceUserTasksState(userTasksGet());
      const pastHistory = get().past.slice();
      const futureHistory = get().future.slice();
      if (pastHistory.length > 0) {
        const newCurrentState = pastHistory.pop() as UserTasksState;
        futureHistory.push(currentState);
        userTasksSet(newCurrentState);
        set({ past: pastHistory, future: futureHistory });
      }
    },
    redo: () => {
      const currentState = reduceUserTasksState(userTasksGet());
      const pastHistory = get().past.slice();
      const futureHistory = get().future.slice();
      if (futureHistory.length > 0) {
        const newCurrentState = futureHistory.pop() as UserTasksState;
        pastHistory.push(currentState);
        userTasksSet(newCurrentState);
        set({ past: pastHistory, future: futureHistory });
      }
    },
    savePreviousState: (previousState) => {
      const reducedPreviousState = previousState;
      const reducedCurrentState = reduceUserTasksState(userTasksGet());
      if (
        JSON.stringify(reducedPreviousState) !==
        JSON.stringify(reducedCurrentState)
      ) {
        const pastHistory = get().past.slice();
        pastHistory.push(previousState);
        if (pastHistory.length > 50) pastHistory.shift();
        set({ past: pastHistory, future: [] });
      }
    },
  }));
};
