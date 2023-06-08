import { ComponentProps, forwardRef, useEffect, useState } from "react";

export type TodoInputProps = Omit<ComponentProps<"input">, "onChange"> & {
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  onEscape?: () => void;
};

export const TodoInput = forwardRef<HTMLInputElement, TodoInputProps>(
  (
    { onChange = () => null, onEscape = () => null, defaultValue, ...props },
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
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onBlur={() => onChange(inputValue)}
      />
    );
  }
);

TodoInput.displayName = "TodoInput";
