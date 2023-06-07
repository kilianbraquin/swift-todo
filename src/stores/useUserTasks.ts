import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserPreferences } from "@/stores/useUserPreferences";

export type Task = {
  id: string;
  name: string;
  done: Date | null;
};

type State = {
  tasks: Task[];
};

type Action = {
  addTask: () => string;
  setTasks: (tasks: Task[]) => void;
  removeTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  removeAllTasks: () => void;
  setTodoTaskField: (taskId: string, field: "name", value: string) => void;
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
      addTask: () => {
        const newTodoTask: Task = {
          id: generateTaskId(),
          name: "New Task",
          done: null,
        };
        set((state) => {
          const { addTasksOnTop } = useUserPreferences.getState();
          if (addTasksOnTop)
            return {
              tasks: [newTodoTask, ...state.tasks],
            };
          else
            return {
              tasks: [...state.tasks, newTodoTask],
            };
        });
        return newTodoTask.id;
      },
      setTasks: (tasks) => set({ tasks }),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      toggleTaskStatus: (taskId) =>
        set((state) => {
          const task = state.tasks.find((task) => task.id === taskId);
          if (task) {
            if (!task.done) task.done = new Date();
            else task.done = null;
          }
          return {
            tasks: [...state.tasks],
          };
        }),
      setTodoTaskField: (taskId, field, value) =>
        set((state) => {
          const task = state.tasks.find(({ id }) => id === taskId);
          if (task) {
            task[field] = value;
          }
          return { tasks: [...state.tasks] };
        }),
      removeAllTasks: () => set(() => ({ tasks: [] })),
    }),
    {
      name: "user_tasks", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
