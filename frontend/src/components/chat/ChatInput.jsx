import React, { useState } from "react";
import { PenIcon, Check } from "lucide-react";

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      onSend?.(inputValue.trim());
      setInputValue("");
    }
  };

  const hasText = inputValue.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2 shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask anything about DMIL"
          className="flex-1 bg-transparent px-3 text-sm outline-none"
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={!hasText}
          className={`rounded-full p-2 transition ${
            hasText
              ? "bg-[#3B98FF] hover:bg-[#2B7CD9]"
              : "bg-[#3B98FF]"
          }`}
        >
          {hasText ? (
            <Check size={16} className="text-white" />
          ) : (
            <PenIcon size={16} className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;