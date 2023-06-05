import { create } from "zustand";

type State = {
  autoFocusTaskId: string;
};

type Action = {
  setAutoFocus: (text: string) => void;
  resetAutoFocus: () => void;
};

export const useAutoFocus = create<State & Action>((set) => ({
  autoFocusTaskId: "",
  setAutoFocus: (taskId) => set(() => ({ autoFocusTaskId: taskId })),
  resetAutoFocus: () => set(() => ({ autoFocusTaskId: "" })),
}));
