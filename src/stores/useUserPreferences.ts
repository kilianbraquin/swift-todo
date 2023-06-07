import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  addTasksOnTop: boolean;
  autoFocusNewTask: boolean;
  hideCompletedTasks: boolean;
};

type Action = {
  setAddTasksOnTop: (newValue: boolean) => void;
  setAutoFocusNewTask: (newValue: boolean) => void;
  setHideCompletedTasks: (newValue: boolean) => void;
};

export const useUserPreferences = create(
  persist<State & Action>(
    (set) => ({
      addTasksOnTop: true,
      autoFocusNewTask: false,
      hideCompletedTasks: false,
      setAddTasksOnTop: (newValue) => set({ addTasksOnTop: newValue }),
      setAutoFocusNewTask: (newValue) => set({ autoFocusNewTask: newValue }),
      setHideCompletedTasks: (newValue) =>
        set({ hideCompletedTasks: newValue }),
    }),
    {
      name: "user_preferences", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
