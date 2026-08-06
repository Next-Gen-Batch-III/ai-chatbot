import React from "react";

const QuickActions = ({ actions = [] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-lg px-8 py-3">
      {actions.map((action, index) => (
        <button
          key={`${action.label}-${index}`}
          type="button"
          onClick={action.onClick}
          className="rounded-[18px] rounded-br-[42px] bg-[#3B98FF] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#2B7CD9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};
export default QuickActions;
