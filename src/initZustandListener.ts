import { useUserTasks } from "@/stores/useUserTasks.ts";

const storageEventCallback = (e: StorageEvent) => {
  if (e.key === useUserTasks.persist.getOptions().name) {
    useUserTasks.persist.rehydrate();
  }
};

const keydownEventCallback = (e: KeyboardEvent) => {
  if (!document.activeElement || document.activeElement.nodeName !== "INPUT") {
    if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey)) {
      const { undo, redo } = useUserTasks.temporal.getState();
      if (!e.shiftKey) undo();
      else redo();
      e.preventDefault();
    }
  }
};

window.addEventListener("storage", storageEventCallback);
window.addEventListener("keydown", keydownEventCallback);
