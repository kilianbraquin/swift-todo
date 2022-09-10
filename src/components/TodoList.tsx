import { TodoListContext } from "@/contexts/TodoListContext";
import { deleteTodoList, setTodoListField } from "@/reducers/todolists/actions";
import { TodoList as TodoListType } from "@/reducers/todolists/types";
import { motion, useAnimationControls } from "framer-motion";
import { FC, useContext, useEffect, useRef } from "react";

export type TodoListProps = {
  todoList: TodoListType;
};

export const TodoList: FC<TodoListProps> = ({ todoList }) => {
  const controls = useAnimationControls();
  const { todoListsDispatch } = useContext(TodoListContext);
  const refNameInput = useRef<HTMLInputElement>(null);
  const refDescriptionInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("called");
    refNameInput.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      className="bg-white max-w-xl w-full px-4 py-3 rounded-md shadow-md"
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <input
        ref={refNameInput}
        className="block bg-none outline-none font-title font-bold text-xl mb-1 text-neutral-900"
        type="text"
        value={todoList.name}
        onChange={(e) =>
          todoListsDispatch(
            setTodoListField(todoList.id, "name", e.currentTarget.value)
          )
        }
        placeholder="Name"
        autoFocus={true}
        onKeyDown={(event) => {
          if (event.key === "Enter") refDescriptionInput.current.focus();
        }}
      />
      <input
        ref={refDescriptionInput}
        className="block bg-none outline-none"
        type="text"
        value={todoList.description}
        onChange={(e) =>
          todoListsDispatch(
            setTodoListField(todoList.id, "description", e.currentTarget.value)
          )
        }
        placeholder="Description"
        onKeyDown={(event) => {
          if (event.key === "Enter") refDescriptionInput.current.blur();
        }}
      />
      <button onClick={() => todoListsDispatch(deleteTodoList(todoList.id))}>
        Delete
      </button>
    </motion.div>
  );
};
