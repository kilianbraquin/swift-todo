import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserPreferences } from "@/stores/useUserPreferences";
import { temporal } from "zundo";

export type Task = {
  id: string;
  name: string;
  createdAt: Date;
  done: Date | null;
};

export type State = {
  tasks: Task[];
};

export type Action = {
  addTask: () => string;
  setTasks: (tasks: Task[]) => void;
  isExistingTask: (taskId: string) => boolean;
  removeTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  duplicateTask: (taskId: string) => string | null;
  moveTaskUp: (taskId: string) => void;
  moveTaskDown: (taskId: string) => void;
  removeAllTasks: () => void;
  setTodoTaskField: (taskId: string, field: "name", value: string) => void;
  sortTasks: (type: "addedDate" | "completedDate") => void;
};

function generateTaskId() {
  return (
    Math.random().toString().substring(2, 15) +
    Math.random().toString().substring(2, 15)
  );
}

export const useUserTasks = create(
  persist(
    temporal<State & Action>((set, get) => ({
      tasks: [],
      isExistingTask: (taskId: string) =>
        get().tasks.some((task) => task.id === taskId),
      addTask: () => {
        const newTodoTask: Task = {
          id: generateTaskId(),
          name: "New Task",
          createdAt: new Date(),
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
      duplicateTask: (taskId) => {
        const newTaskList = get().tasks.slice();
        const taskIndex = newTaskList.findIndex((task) => task.id === taskId);
        const task = newTaskList[taskIndex];
        if (task) {
          const newTodoTask: Task = {
            id: generateTaskId(),
            name: task.name,
            createdAt: new Date(),
            done: null,
          };
          newTaskList.splice(taskIndex + 1, 0, newTodoTask);
          set({
            tasks: newTaskList,
          });
          return newTodoTask.id;
        } else return null;
      },
      moveTaskUp: (taskId) =>
        set((state) => {
          const newTasksOrder = state.tasks.slice();
          const taskIndex = newTasksOrder.findIndex(
            (task) => task.id === taskId,
          );
          const task = newTasksOrder[taskIndex];
          if (task && taskIndex > 0) {
            newTasksOrder.splice(taskIndex, 1);
            newTasksOrder.splice(taskIndex - 1, 0, task);
          }
          return { tasks: newTasksOrder };
        }),
      moveTaskDown: (taskId) =>
        set((state) => {
          const newTasksOrder = state.tasks.slice();
          const taskIndex = newTasksOrder.findIndex(
            (task) => task.id === taskId,
          );
          const task = newTasksOrder[taskIndex];
          if (task && taskIndex < newTasksOrder.length - 1) {
            newTasksOrder.splice(taskIndex, 1);
            newTasksOrder.splice(taskIndex + 1, 0, task);
          }
          return { tasks: newTasksOrder };
        }),
      toggleTaskStatus: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              const value = !task.done ? new Date() : null;
              return { ...task, done: value };
            }
            return task;
          }),
        })),
      setTodoTaskField: (taskId, field, value) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, [field]: value };
            }
            return task;
          }),
        })),
      removeAllTasks: () => set(() => ({ tasks: [] })),
      sortTasks: (type) =>
        set((state) => {
          const newTasksOrder = state.tasks.slice();
          const dateAttribute: keyof Task =
            type === "completedDate" ? "done" : "createdAt";
          newTasksOrder.sort((a, b) => {
            const aDate = a[dateAttribute];
            const bDate = b[dateAttribute];
            if (aDate === null && bDate === null) {
              return 0;
            } else if (aDate === null) return -1;
            else if (bDate === null) return 1;
            else {
              return new Date(aDate).getTime() > new Date(bDate).getTime()
                ? -1
                : 1;
            }
          });
          return { tasks: newTasksOrder };
        }),
    })),
    {
      name: "user_tasks", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
