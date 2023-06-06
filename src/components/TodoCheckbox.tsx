import { FC } from "react";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";

export type TodoCheckboxProps = {
  value: boolean;
  setValue: (newValue: boolean) => void;
};

export const TodoCheckbox: FC<TodoCheckboxProps> = ({ value, setValue }) => {
  return (
    <label className="select-none cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      <div className="h-5 w-5 flex justify-center items-center border-2 border-[#98D4F3] bg-[#98D4F3] rounded-lg">
        {value && <CheckIcon className="fill-white" width={20} height={20} />}
      </div>
    </label>
  );
};
