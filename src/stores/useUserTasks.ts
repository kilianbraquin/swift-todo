import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Task = {
  id: string;
  name: string;
  description: string;
  done: boolean;
};

type State = {
  tasks: Task[];
};

type Action = {
  addTask: () => void;
  removeTask: (taskId: string) => void;
  setTodoTaskField: (
    taskId: string,
    field: "name" | "description",
    value: string
  ) => void;
};

function generateTaskId() {
  return (
    Math.random().toString().substring(2, 15) +
    Math.random().toString().substring(2, 15)
  );
}

export const useUserTasks = create(
  persist<State & Action>(
    (set) => ({
      tasks: [],
      addTask: () =>
        set((state) => {
          const newTodoTask: Task = {
            id: generateTaskId(),
            name: "New TodoList",
            description: "",
            done: false,
          };
          return {
            tasks: [...state.tasks, newTodoTask],
          };
        }),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      setTodoTaskField: (taskId, field, value) =>
        set((state) => {
          const task = state.tasks.find(({ id }) => id === taskId);
          if (task) {
            task[field] = value;
          }
          return { tasks: [...state.tasks] };
        }),
    }),
    {
      name: "user_tasks", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
