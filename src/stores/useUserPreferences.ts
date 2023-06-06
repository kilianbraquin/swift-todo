import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  addTasksOnTop: boolean;
  autoFocusNewTask: boolean;
};

type Action = {
  setAddTasksOnTop: (newValue: boolean) => void;
  setAutoFocusNewTask: (newValue: boolean) => void;
};

export const useUserPreferences = create(
  persist<State & Action>(
    (set) => ({
      addTasksOnTop: true,
      autoFocusNewTask: false,
      setAddTasksOnTop: (newValue) => set({ addTasksOnTop: newValue }),
      setAutoFocusNewTask: (newValue) => set({ autoFocusNewTask: newValue }),
    }),
    {
      name: "user_preferences", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
