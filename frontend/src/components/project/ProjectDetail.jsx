import { FiArrowLeft, FiFileText } from "react-icons/fi";
import ChatInput from "../chat/ChatInput";

export default function ProjectDetail({ project, onBack, onSelectChat, onSend }) {
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
        <h2 className="text-sm font-bold text-gray-900">{project.name}</h2>
      </div>

      <div className="mt-3 flex-1 space-y-0.5 overflow-y-auto">
        {project.chats.length === 0 ? (
          <p className="px-1 py-4 text-sm text-gray-400">
            No chats in this project yet. Ask something below to get started.
          </p>
        ) : (
          project.chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat?.(chat.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <FiFileText className="shrink-0 text-gray-500" size={15} />
              <span className="truncate">{chat.title}</span>
            </button>
          ))
        )}
      </div>

    </div>
  );
}