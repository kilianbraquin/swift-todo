import { ComponentProps, forwardRef, useEffect, useState } from "react";
import clsx from "clsx";

export type TodoInputProps = Omit<ComponentProps<"input">, "onChange"> & {
  completed?: boolean;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  onEscape?: () => void;
};

export const TodoInput = forwardRef<HTMLInputElement, TodoInputProps>(
  (
    {
      className,
      completed,
      onChange = () => null,
      onEscape = () => null,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(defaultValue ?? "");

    useEffect(() => {
      setInputValue(defaultValue ?? "");
    }, [defaultValue]);

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className={clsx(
          className,
          "block overflow-ellipsis bg-none font-title text-lg font-bold outline-none transition-colors duration-300 sm:text-xl",
          completed ? "text-neutral-400" : "text-neutral-900"
        )}
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onBlur={() => onChange(inputValue)}
      />
    );
  }
);

TodoInput.displayName = "TodoInput";
