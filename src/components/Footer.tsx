import { TodoListContext } from "@/contexts/TodoListContext";
import { FC, useContext } from "react";

export const Footer: FC = () => {
  const { tasks } = useContext(TodoListContext);
  if (tasks.length === 0)
    return (
      <footer className="fixed bottom-0 inset-x-0 flex justify-center py-2">
        <div className="font-bold">By IndieBaie Studio</div>
      </footer>
    );
  else return null;
};
