import { FC } from "react";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

export type CheckboxProps = {
  label: string;
  value: boolean;
  setValue: (newValue: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ label, value, setValue }) => {
  return (
    <label
      className="flex cursor-pointer select-none items-center gap-1.5"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") setValue(!value);
      }}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => setValue(e.currentTarget.checked)}
      />
      <div className="flex h-4 w-4 items-center justify-center rounded-md border border-neutral-600">
        {value && <CheckIcon className="fill-neutral-600" width={12} />}
      </div>
      <span className="font-medium text-neutral-600">{label}</span>
    </label>
  );
};
