import { FC } from "react";

const commands = [
  { keys: ["Ctrl + Z", "⌘ + Z"], action: "Undo" },
  { keys: ["Ctrl + ⇧ + Z", "⌘ + ⇧ + Z"], action: "Redo" },
  { keys: ["Drag & Drop"], action: "Change Order" },
  { keys: ["Space"], action: "Edit Task Title" },
  { keys: ["Shift + Enter"], action: "Toggle Task Status" },
  { keys: ["Shift + Backspace"], action: "Delete Task" },
  { keys: ["Alt + ↑", "⌥ + ↑"], action: "Move Task Up" },
  { keys: ["Alt + ↓", "⌥ + ↓"], action: "Move Task Down" },
];

export const Help: FC = () => {
  return (
    <ul className="absolute -left-[242px] top-4 hidden w-full max-w-[224px] divide-y divide-dashed lg:block xl:-left-[292px] xl:max-w-[260px]">
      {commands.map(({ keys, action }) => (
        <li
          key={action}
          className="flex gap-1 py-0.5 text-xs first:pt-0 xl:text-sm"
        >
          <ul className="w-28 flex-shrink-0 font-body font-semibold xl:w-32">
            <li className="inline-block whitespace-pre-line">
              {keys.join("\n")}
            </li>
          </ul>
          <div>{action}</div>
        </li>
      ))}
    </ul>
  );
};
