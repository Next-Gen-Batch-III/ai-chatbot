import React, { useState } from "react";

const QuickActions = ({ actions = [] }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex w-fit flex-col gap-2 md:flex-row">
      {actions.map((action, index) => (
        <button
          key={`${action.label}-${index}`}
          type="button"
          onClick={() => {
            setSelected(index);
            action.onClick?.();
          }}
          className={`w-fit whitespace-nowrap rounded-[12px] rounded-br-[28px] border-2 px-3 py-2 text-left text-sm shadow-sm transition
            ${
              selected === index
                ? "border-blue-700 bg-blue-50 text-blue-700"
                : "border-transparent bg-[#3B98FF] text-white hover:bg-[#2B7CD9] hover:shadow-md"
            }
          `}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;