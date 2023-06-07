import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import clsx from "clsx";

export type TodoCheckboxProps = {
  value: boolean;
  setValue: (newValue: boolean) => void;
  disabled?: boolean;
};

export const TodoCheckbox: FC<TodoCheckboxProps> = ({
  disabled,
  value,
  setValue,
}) => {
  const [preventChange, setPreventChange] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled && isHovered) setPreventChange(true);
  }, [disabled, isHovered]);

  useEffect(() => {
    if (preventChange && !disabled) setPreventChange(false);
  }, [disabled, isHovered, preventChange]);

  return (
    <label
      tabIndex={0}
      className="cursor-pointer select-none"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          setValue(!value);
        }
      }}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        disabled={disabled}
        onChange={(e) => {
          if (!preventChange) setValue(e.currentTarget.checked);
          else setPreventChange(false);
        }}
      />
      <div
        className={clsx("relative h-5 w-5  rounded-lg border-2 border-main")}
      >
        <AnimatePresence>
          {value && (
            <>
              <motion.div
                className="absolute -inset-px rounded-lg bg-main"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.25 }}
              >
                <CheckIcon
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-white"
                  width={16}
                  height={16}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
};
