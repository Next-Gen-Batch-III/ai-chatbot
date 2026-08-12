import React, { useState } from "react";
import LogoImg from "../../assets/images/NGEP_BOT_LOGO.png";
import { useUser } from "@clerk/clerk-react";

import {
  CirclePlus,
  Briefcase,
  Clock,
  StickyNote,
  User,
  Sidebar as SidebarIcon,
  ChevronDown,
  Menu as MenuIcon,
  Pin,
} from "lucide-react";
const Sidebar = ({
  isOpen,
  onToggle,
  onNewChat,
  onProjectsClick,
  onHistoryClick,
  pinnedChats = [],
  recentChats = [],
  onTogglePin,
  onSignInClick,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Pinned and Recents open/close
  const [isPinnedOpen, setIsPinnedOpen] = useState(true);
  const [isRecentOpen, setIsRecentOpen] = useState(true);

  const { isSignedIn, user } = useUser();

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-4 top-4 z-50 rounded-[16px] rounded-tl-[32px] rounded-br-[48px] bg-[#3B98FF] px-3 py-1.5 text-white md:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon size={22} className =" rounded-br-[48px]" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-screen
          flex-col rounded-br-[48px] bg-[#3B98FF]
          text-white transition-[width,transform] duration-300
          w-[80vw] shrink-0

          ${isOpen ? "md:w-64" : "md:w-16"}

          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}

          md:static md:translate-x-0
        `}
      >
        {/* Logo + Menu */}
        <div
          className={`
            flex shrink-0 items-center py-5
            ${isOpen ? "justify-between px-5" : "justify-center"}
          `}
        >
          {/* Logo */}
          {isOpen && (
            <div className="shrink-0">
              <img
                src={LogoImg}
                alt="Logo"
                className="h-10 w-auto"
              />
            </div>
          )}

          {/* Desktop Menu */}
          <button
            onClick={onToggle}
            className="hidden shrink-0 rounded-lg p-1.5 hover:bg-blue-400 md:block"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon size={22} />
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-1.5 hover:bg-blue-400 md:hidden"
            aria-label="Close sidebar"
          >
            <SidebarIcon size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="shrink-0 px-2">
          {/* New Chat */}
          <button
            onClick={onNewChat}
            className={`
              mb-2 flex w-full items-center rounded-lg
              py-1.5 text-sm hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <CirclePlus size={18} />

            {isOpen && <span>New Chat</span>}
          </button>

          {/* Projects */}
          <button
            onClick={onProjectsClick}
            className={`
              mb-2 flex w-full items-center rounded-lg
              py-1.5 text-sm hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <Briefcase size={18} />

            {isOpen && <span>Projects</span>}
          </button>

          {/* History */}
          <button
            onClick={onHistoryClick}
            className={`
              mb-4 flex w-full items-center rounded-lg
              py-1.5 text-sm hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <Clock size={18} />

            {isOpen && <span>History</span>}
          </button>
        </nav>

        {/* Scrollable Chat Area */}
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-3">

          {/* ================= PINNED ================= */}

        <div
          className={`
            mb-2 flex items-center
            ${isOpen ? "justify-between px-3" : "justify-center"}
          `}
        >
          <h4
            className={`
              font-semibold text-blue-100
              ${isOpen ? "text-sm" : "text-sm"}
            `}
          >
            {isOpen ? "Pinned" : "Pinned"}
          </h4>

          {isOpen && (
            <button
              type="button"
              onClick={() => setIsPinnedOpen(!isPinnedOpen)}
            >
              <ChevronDown
                size={16}
                className={`
                  transition-transform duration-200
                  ${isPinnedOpen ? "" : "-rotate-90"}
                `}
              />
            </button>
          )}
        </div> 

          {/* Pinned Chats */}
          {isPinnedOpen && (
            <div className="space-y-1">
              {pinnedChats.map((chat) => (
                <div
                  key={chat.id}
                  className="
                    group flex w-full
                    items-center rounded-md
                    hover:bg-blue-400
                  "
                >
                  {/* Chat */}
                  <button
                    className={`
                      flex min-w-0 flex-1
                      items-center rounded-md
                      py-1.5 text-left text-xs
                      ${isOpen ? "gap-2 px-3" : "justify-center"}
                    `}
                  >
                    <StickyNote size={14} />

                    {isOpen && (
                      <span className="truncate">
                        {chat.title}
                      </span>
                    )}
                  </button>

                  {/* Unpin */}
                  {isOpen && (
                    <button
                      type="button"
                      onClick={() => onTogglePin?.(chat.id)}
                      title="Unpin"
                      className="
                      mr-2 rounded p-1
                      opacity-100
                      md:opacity-0
                      md:group-hover:opacity-100
                      hover:bg-blue-500
                        
                      "
                    >
                      <Pin size={13} fill="currentColor" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ================= RECENTS ================= */}

          <div
            className={`
              mb-2 mt-6 flex items-center
              ${isOpen ? "justify-between px-3" : "justify-center"}
            `}
          >
            <h4
              className={`
                font-semibold text-blue-100
                ${isOpen ? "text-sm" : "text-sm"}
              `}
            >
              {isOpen ? "Recents" : "Recents"}
            </h4>

            {isOpen && (
              <button
                type="button"
                onClick={() => setIsRecentOpen(!isRecentOpen)}
              >
                <ChevronDown
                  size={16}
                  className={`
                    transition-transform duration-200
                    ${isRecentOpen ? "" : "-rotate-90"}
                  `}
                />
              </button>
            )}
          </div>

          {/* Recent Chats */}
          {isRecentOpen && (
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="
                    group flex w-full
                    items-center rounded-md
                    hover:bg-blue-400
                  "
                >
                  {/* Chat */}
                  <button
                    className={`
                      flex min-w-0 flex-1
                      items-center rounded-md
                      py-1.5 text-left text-xs
                      ${isOpen ? "gap-2 px-3" : "justify-center"}
                    `}
                  >
                    <StickyNote size={14} />

                    {isOpen && (
                      <span className="truncate">
                        {chat.title}
                      </span>
                    )}
                  </button>

                  {/* Pin */}
                  {isOpen && (
                    <button
                      type="button"
                      onClick={() => onTogglePin?.(chat.id)}
                      title="Pin"
                      className="
                        mr-2 rounded p-1
                        opacity-0 transition-opacity
                        hover:bg-blue-500
                        group-hover:opacity-100
                      "
                    >
                      <Pin size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="shrink-0 p-3">
          <button
            type="button"
            onClick={onSignInClick}
            className={`
              flex items-center text-sm text-gray-700
              ${isOpen
                ? "w-full gap-3 rounded-lg rounded-br-[48px] bg-white px-3 py-2 shadow hover:bg-gray-100"
                : "h-9 w-full justify-center"
              }
            `}
          >
            {/* Profile Image */}
            <div
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                overflow-hidden rounded-full
                bg-gray-200 text-gray-700
              "
            >
              {isSignedIn && user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={15} />
              )}
            </div>

            {/* Name only appear when open sidebar */}
            {isOpen && (
              <span className="truncate font-medium">
                {isSignedIn
                  ? user?.firstName || "User"
                  : "Guest"}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
