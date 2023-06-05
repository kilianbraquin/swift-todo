import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useUserTasks } from "@/stores/useUserTasks";

const positionHorizontal = {
  left: "50%",
  translateX: "-50%",
};

export const NewTaskButton: FC = () => {
  const tasks = useUserTasks((state) => state.tasks);
  const addTask = useUserTasks((state) => state.addTask);

  return (
    <>
      <AnimatePresence>
        {tasks.length === 0 && (
          <motion.button
            className="bg-primary-500 font-medium text-white p-4 rounded-lg shadow-md fixed"
            onClick={addTask}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.9 }}
            initial={{
              ...positionHorizontal,
              bottom: "50%",
              translateX: "-50%",
              translateY: "32px",
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.3,
              },
            }}
            exit={{
              bottom: 0,
              translateY: "100%",
              scale: 0.2,
              opacity: 0.5,
              transition: {
                duration: 0.3,
              },
            }}
          >
            + Create New Task
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {tasks.length > 0 && (
          <motion.button
            className="bg-primary-500 text-white pt-2 pb-1.5 font-medium w-80 rounded-t-lg shadow-md absolute"
            onClick={addTask}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.9 }}
            initial={{
              ...positionHorizontal,
              bottom: "0",
              translateX: "-50%",
              transformOrigin: "bottom center",
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transformOrigin: "bottom center",
              transition: { delay: 0.3 },
            }}
            exit={{
              bottom: 0,
              scale: 0,
              transformOrigin: "bottom center",
              transition: {
                duration: 0.3,
              },
            }}
          >
            + Create New Task
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
