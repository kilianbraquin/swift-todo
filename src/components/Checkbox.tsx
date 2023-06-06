import { FC } from "react";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

export type CheckboxProps = {
  label: string;
  value: boolean;
  setValue: (newValue: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ label, value, setValue }) => {
  return (
    <label className="flex cursor-pointer select-none items-center gap-1.5">
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      <div className="flex h-4 w-4 items-center justify-center rounded-md border border-neutral-700 text-neutral-700">
        {value && <CheckIcon className="fill-neutral-700" width={12} />}
      </div>
      <span>{label}</span>
    </label>
  );
};
