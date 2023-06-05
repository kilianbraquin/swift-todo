import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  addTasksOnTop: boolean;
};

type Action = {};

export const useUserPreferences = create(
  persist<State & Action>(
    (set) => ({
      addTasksOnTop: false,
    }),
    {
      name: "user_preferences", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
