"use client";
import { FC, useEffect } from "react";
import { useUserTasks } from "@/stores/useUserTasks";

export const Zustand: FC = () => {
  const { undo, redo } = useUserTasks.history.getState();

  useEffect(() => {
    const storageEventCallback = (e: StorageEvent) => {
      if (e.key === useUserTasks.persist.getOptions().name) {
        useUserTasks.persist.rehydrate();
      }
    };

    const keydownEventCallback = (e: KeyboardEvent) => {
      if (
        !document.activeElement ||
        document.activeElement.nodeName !== "INPUT"
      ) {
        if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey)) {
          if (!e.shiftKey) undo();
          else redo();
        }
      }
    };

    window.addEventListener("storage", storageEventCallback);
    window.addEventListener("keydown", keydownEventCallback);
    return () => {
      window.removeEventListener("storage", storageEventCallback);
      window.removeEventListener("keydown", keydownEventCallback);
    };
  }, []);

  return null;
};
