import { FiArrowLeft, FiFileText } from "react-icons/fi";

export default function ProjectDetail({
  project,
  onBack,
  onSelectChat,
  availableChats = [],
  onAddChat,
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Back to projects"
        >
          <FiArrowLeft size={16} />
        </button>
        <h2 className="text-sm font-bold text-black">{project.name}</h2>
      </div>

      <div className="mt-3 flex-1 space-y-0.5 overflow-y-scroll max-h-[400px]">
        {project.chats.length === 0 ? (
          <p className="px-1 py-4 text-sm text-gray-400">No chats in this project yet.</p>
        ) : (
          project.chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat?.(chat.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-800 transition-colors hover:bg-gray-100"
            >
              <FiFileText className="shrink-0 text-gray-500" size={15} />
              <span className="truncate">{chat.title}</span>
            </button>
          ))
        )}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <h3 className="px-1 text-xs font-semibold text-gray-700">Add a chat</h3>
        {availableChats.length === 0 ? (
          <p className="px-1 py-3 text-xs text-gray-400">No standalone chats available.</p>
        ) : (
          <div className="mt-2 max-h-36 space-y-1 overflow-y-auto">
            {availableChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onAddChat?.(chat.id)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-800 transition-colors hover:bg-blue-50"
              >
                <FiFileText className="shrink-0 text-gray-500" size={15} />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
