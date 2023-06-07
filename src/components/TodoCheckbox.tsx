import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import clsx from "clsx";

export type TodoCheckboxProps = {
  value: boolean;
  setValue: (newValue: boolean) => void;
  deleted?: boolean;
  disabled?: boolean;
};

export const TodoCheckbox: FC<TodoCheckboxProps> = ({
  deleted,
  disabled,
  value,
  setValue,
}) => {
  const [preventChange, setPreventChange] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ToggleIcon = useMemo(
    () => (deleted ? XMarkIcon : CheckIcon),
    [deleted]
  );

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
        className={clsx(
          "relative h-5 w-5  rounded-lg border-2",
          deleted ? "border-danger-500" : "border-main"
        )}
      >
        <AnimatePresence>
          {(value || deleted) && (
            <motion.div
              className={clsx(
                "absolute -inset-px rounded-lg",
                deleted ? "bg-danger-500" : "bg-main"
              )}
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
              <ToggleIcon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-white"
                width={16}
                height={16}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
};
