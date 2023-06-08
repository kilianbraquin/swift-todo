import { State as UserTasksState } from "@/stores/useUserTasks";
import {
  Mutate,
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
} from "zustand";
import {
  createTaskHistory,
  reduceUserTasksState,
  TaskHistoryStoreProps,
} from "@/lib/zustand/createTaskHistory";
import { Cast, Write } from "@/types/utils";

// https://docs.pmnd.rs/zustand/guides/typescript#middleware-that-changes-the-store-type
declare module "zustand" {
  interface StoreMutators<S, A> {
    history: Write<Cast<S, object>, { history: A }>;
  }
}

type RecordTasks = <
  T,
  A = T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<
    T,
    [...Mps, ["history", StoreApi<TaskHistoryStoreProps>]],
    Mcs
  >
) => StateCreator<
  T,
  Mps,
  [["history", StoreApi<TaskHistoryStoreProps>], ...Mcs]
>;

type RecordTasksImpl = <T extends UserTasksState>(
  f: StateCreator<T, [], []>
) => StateCreator<T, [], []>;

const recordTasksImpl: RecordTasksImpl =
  <T>(config) =>
  (
    set,
    get,
    api: Mutate<StoreApi<T>, [["history", StoreApi<TaskHistoryStoreProps>]]>
  ) => {
    api.history = createTaskHistory(set, get);

    return config(
      (args) => {
        const previousState = reduceUserTasksState(get());
        set(args);
        api.history.getState().savePreviousState(previousState);
      },
      get,
      api
    );
  };

export const recordTasks = recordTasksImpl as unknown as RecordTasks;
