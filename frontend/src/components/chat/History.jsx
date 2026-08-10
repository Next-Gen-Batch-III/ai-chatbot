import React, { useState, useEffect, useRef} from "react";
import {
  X,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getChats } from "../../api/index.js";
import { useToast } from "../../hooks/useToast.js";

export default function History({
  onClose,
  onSelectChat,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [chats, setChats] = useState([]);

  const nextCursorRef = useRef(null);
  const isLoadingRef = useRef(false);

  const observerRef = useRef(null);

  const toast = useToast();

  const loadChats = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      const cursor = nextCursorRef.current;
      const response = await getChats(cursor ? { cursor, limit: 10 } : {limit: 10});
      const { chats , nextCursor } = response.data.data;

      setChats((prevChats) => (cursor ? [...prevChats, ...chats] : chats));
      nextCursorRef.current = nextCursor;
    } catch (error) {
      toast.error(
        error.message ?? "Failed to load chats."
      );
    } finally {
      isLoadingRef.current = false;
    }
  };

     


  const navigate = useNavigate();

  const filterOptions = [
    "All",
    "Last 15 minutes",
    "Last hour",
    "Last 24 hours",
    "Last 7 days",
    "Last 4 weeks",
  ];

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextCursorRef.current) {
        loadChats();
      }
    }, { threshold: 0.5 });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  });

  /*
   * Filter chats 
   */
  const filteredChats = chats.filter((chat) => {
    if (!chat.lastMessageAt) return false;

    if (selectedFilter === "All") {
      return true;
    }

    const chatDate = new Date(chat.lastMessageAt);
    const now = new Date();

    const difference = now - chatDate;

    const minutes = difference / (1000 * 60);
    const hours = difference / (1000 * 60 * 60);
    const days = difference / (1000 * 60 * 60 * 24);

    switch (selectedFilter) {
      case "Last 15 minutes":
        return minutes <= 15;

      case "Last hour":
        return hours <= 1;

      case "Last 24 hours":
        return hours <= 24;

      case "Last 7 days":
        return days <= 7;

      case "Last 4 weeks":
        return days <= 28;

      default:
        return true;
    }
  });

  /*
   * Sort newest chats
   */
  const sortedChats = [...filteredChats].sort(
    (a, b) =>
      new Date(b.lastMessageAt) -
      new Date(a.lastMessageAt)
  );

  /*
   * Get date without time
   */
  const getDateKey = (dateString) => {
    const date = new Date(dateString);

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  /*
   * Group chats by date
   */
  const groupedChats = sortedChats.reduce(
    (groups, chat) => {
      const key = getDateKey(chat.lastMessageAt);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(chat);

      return groups;
    },
    {}
  );

  /*
   * Format date title
   */
  const formatDateTitle = (dateString) => {
    const date = new Date(dateString);

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    if (
      date.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      date.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSelectChat = (chat) => {
    navigate(`/chat/${chat.id}`);
    onSelectChat?.(chat);
    onClose();
  }

  return (
    /*
     * Overlay
     */
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 px-4
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="
          relative flex h-[80vh] w-full
          max-w-[700px] flex-col
          rounded-[20px] bg-white p-5
          shadow-xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Header */}
        <div
          className="
            mb-4 flex shrink-0
            items-center justify-between
          "
        >
          {/* Title */}
          <h2 className="text-base font-semibold text-gray-900">
            History
          </h2>

          <div className="flex items-center gap-2">
            {/* Filter */}
            <div className="relative ">
              <button
                type="button"
                onClick={() =>
                  setShowFilter(
                    !showFilter
                  )
                }
                className="
                  flex items-center gap-1
                  rounded-[16px]
                  bg-[#3B98FF]
                  px-4 py-2
                  text-xs font-medium
                  text-white
                  hover:bg-[#2688ef]
                  rounded-br-[48px]
                "
              >
                Filter

                <ChevronDown
                  size={14}
                  className={`
                    transition-transform
                    ${
                      showFilter
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {/* Filter Dropdown */}
              {showFilter && (
                <div
                  className="
                    absolute right-0 top-11
                    z-30 w-40
                    overflow-hidden
                    rounded-[12px]
                    bg-white py-2
                    shadow-lg
                    ring-1
                    ring-gray-200
                  "
                >
                  {filterOptions.map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedFilter(
                            option
                          );
                          setShowFilter(
                            false
                          );
                        }}
                        className={`
                          block w-full
                          px-4 py-2.5
                          text-left text-xs
                          hover:bg-gray-100
                          ${
                            selectedFilter ===
                            option
                              ? "bg-gray-100 font-medium"
                              : "text-gray-800"
                          }
                        `}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="
                flex h-9 w-9
                items-center
                justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-900
              "
              aria-label="Close history"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable */}
        <div
          className="
            min-h-0 flex-1
            overflow-y-auto
            pr-1
          "
        >
          {sortedChats.length > 0 ? (
            <div className="space-y-6">
              {Object.entries(
                groupedChats
              ).map(
                ([dateKey, dateChats]) => {

                  const date =
                    dateChats[0].lastMessageAt;

                  return (
                    <div key={dateKey}>
                      {/* Date */}
                      <p
                        className="
                          mb-2 text-xs
                          text-gray-500
                        "
                      >
                        {formatDateTitle(
                          date
                        )}
                      </p>

                      {/* Chats */}
                      <div className="space-y-1">
                        {dateChats.map(
                          (chat) => (
                            <button
                              key={chat.id}
                              type="button"
                              onClick={() =>
                                handleSelectChat(
                                  chat
                                )
                              }
                              className="
                                flex w-full
                                items-center gap-2
                                rounded-lg
                                px-2 py-2
                                text-left
                                hover:bg-gray-100
                              "
                            >
                              <MessageSquare
                                size={15}
                                strokeWidth={
                                  1.7
                                }
                                className="
                                  shrink-0
                                  text-gray-700
                                "
                              />

                              <span
                                className="
                                  truncate
                                  text-xs
                                  font-medium
                                  text-gray-800
                                "
                              >
                                {chat.title}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            /* Empty */
            <div
              className="
                flex h-full
                items-center
                justify-center
              "
            >
              <p className="text-sm text-gray-400">
                No chat history yet.
              </p>
            </div>
          )}
          <div className="h-px" ref={observerRef}></div>
        </div>
      </div>
    </div>
  );
}