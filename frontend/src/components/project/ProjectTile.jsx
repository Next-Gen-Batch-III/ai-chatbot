import { FiPlus, FiFileText } from "react-icons/fi";

export default function ProjectTile({ variant = "project", label, onClick }) {
  const isAdd = variant === "add";

  return (
    <button
      onClick={onClick}
      className={`flex h-[90px] w-[90px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-2 text-center transition-colors
        ${
          isAdd
            ? "border-2 border-dashed border-gray-200 hover:border-[#3B98FF] hover:bg-blue-50"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          isAdd ? "bg-gray-100 text-gray-500" : "bg-white text-gray-600"
        }`}
      >
        {isAdd ? <FiPlus size={16} /> : <FiFileText size={16} />}
      </span>
      <span className="line-clamp-2 text-xs text-gray-600">{label}</span>
    </button>
  );
}