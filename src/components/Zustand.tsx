"use client";
import { FC, useEffect } from "react";
import { useUserTasks } from "@/stores/useUserTasks";

export const Zustand: FC = () => {
  useEffect(() => {
    const storageEventCallback = (e: StorageEvent) => {
      if (e.key === useUserTasks.persist.getOptions().name) {
        useUserTasks.persist.rehydrate();
      }
    };

    window.addEventListener("storage", storageEventCallback);
    return () => {
      window.removeEventListener("storage", storageEventCallback);
    };
  }, []);

  return null;
};
