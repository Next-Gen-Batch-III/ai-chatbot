import React from "react";

const MessageBox = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%] rounded-3xl px-4 py-2 text-sm
          ${
            isUser
              ? "bg-[#3B98FF] text-white"
              : "bg-gray-100 text-gray-800"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBox;