import { FC } from "react";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";

export type TodoCheckboxProps = {
  value: boolean;
  setValue: (newValue: boolean) => void;
};

export const TodoCheckbox: FC<TodoCheckboxProps> = ({ value, setValue }) => {
  return (
    <label className="cursor-pointer select-none">
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      <div className="flex h-5 w-5 items-center justify-center rounded-lg border-2 border-[#98D4F3] bg-[#98D4F3]">
        {value && <CheckIcon className="fill-white" width={20} height={20} />}
      </div>
    </label>
  );
};
