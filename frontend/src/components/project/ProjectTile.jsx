import { FiPlus, FiFileText } from "react-icons/fi";

export default function ProjectTile({ variant = "project", label, onClick }) {
  const isAdd = variant === "add";

  return (
    <button
      onClick={onClick}
      className="w-20 h-20 rounded-lg transition-all flex flex-col items-center justify-center">

      <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-white">
        {isAdd ? (
          <FiPlus
            size={24}
            strokeWidth={1.8}
            className="text-gray-700"
          />
        ) : (
          <FiFileText
            size={22}
            strokeWidth={1.8}
            className="text-gray-600"
          />
        )}
      </div>
      
      <span className="text-[11px] text-gray-700 text-center leading-tight px-1">
        {isAdd ? "Add new" : label}
      </span>
    </button>
  );
}