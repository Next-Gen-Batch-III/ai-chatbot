import React, { useState } from "react";
import LogoImg from "../assets/logo.png";
import {
  CirclePlus,
  Briefcase,
  Clock,
  StickyNote,
  ChevronDown,
  User,
  Menu,
  Sidebar as SidebarIcon,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pinnedChats = [
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
  ];

  const recentChats = [
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
    "What is DML Theme?",
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-4 top-4 z-50 rounded-lg px-3 py-1.5 text-white bg-blue-500 rounded-br-[32px] rounded-tl-[18px] rounded-bl-[12px] rounded-tr-[12px] md:hidden"
        >
          <Menu size={22} className="rounded-br-[38px]" />
        </button>
      )}

      {/*Sidebar*/}
      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-screen flex-col
          rounded-br-[48px] bg-[#3B98FF] text-white w-[80vw]
          transition-all duration-300

          /* Desktop width */
          ${isOpen ? "md:w-64" : "md:w-16"}

          /* Mobile */
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}

          /* Desktop always visible */
          md:translate-x-0
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
            <div className="shrink-0 items-left">
              <img src={LogoImg} alt="Logo" className="h-24 w-auto" />
            </div>
          )}

          {/* Desktop Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden shrink-0 rounded-lg p-1.5 hover:bg-blue-400 md:block"
          >
            <SidebarIcon size={22} />
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-1.5 hover:bg-blue-400 md:hidden"
          >
            <SidebarIcon size={22} />
          </button>

        </div>

        <nav className="shrink-0 px-2">
          {/* New Chat */}
          <button
            className={`
              mb-2 flex w-full items-center rounded-lg py-1.5 text-sm
              hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <CirclePlus size={18} />

            {isOpen && (
              <span>
                New Chat
              </span>
            )}
          </button>

          {/* Projects */}
          <button
            className={`
              mb-2 flex w-full items-center rounded-lg py-1.5 text-sm
              hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <Briefcase size={18} />

            {isOpen && (
              <span>
                Projects
              </span>
            )}
          </button>

          {/* History */}
          <button
            className={`
              mb-4 flex w-full items-center rounded-lg py-1.5 text-sm
              hover:bg-blue-400
              ${isOpen ? "gap-3 px-3" : "justify-center"}
            `}
          >
            <Clock size={18} />

            {isOpen && (
              <span>
                History
              </span>
            )}
          </button>

        </nav>

        {/* Scrollable Chat Area */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide px-3">

          {/* Pinned */} 
          <h4 className="mb-2 text-left font-semibold text-sm text-blue-100">
            Pinned
          </h4>
          
          <div className="space-y-1">
            {pinnedChats.map((chat, index) => (
              <button
                key={index}
                className={`
                  flex w-full items-center rounded-md py-1.5
                  text-left text-xs hover:bg-blue-400
                  ${isOpen ? "gap-2 px-3" : "justify-center"}
                `}
              > 
                <StickyNote size={14} />

                {isOpen && (
                  <span className="truncate">
                    {chat}
                  </span>
                )}
              </button>
            ))}

          </div>

          {/* Recent */}
            <h4 className="mb-2 mt-6 text-left font-semibold text-sm text-blue-100">
              Recents
            </h4>

          <div className="space-y-1">
            {recentChats.map((chat, index) => (
              <button
                key={index}
                className={`
                  flex w-full items-center rounded-md py-1.5
                  text-left text-xs hover:bg-blue-400
                  ${isOpen ? "gap-2 px-3" : "justify-center"}
                `}
              >
                <StickyNote size={14} />

                {isOpen && (
                  <span className="truncate">
                    {chat}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
       
       {/* Profile */}
        <div className="shrink-0 p-2">

          {isOpen ? (
            <button
              className="
                flex w-full items-center gap-3
                rounded-lg bg-white px-3 py-2
                text-sm text-gray-700 shadow 
                rounded-lg rounded-br-[48px]
              "
            >
              <div
                className="
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-full bg-gray-200
                "
              >
                <User size={15} />
              </div>

              <span className="font-medium">
                User`s Name
              </span>

            </button>

          ) : (

            <div
              className="
                flex h-9 w-full
                items-center justify-center
              "
            >
              <div
                className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-full bg-gray-200
                  text-gray-700
                "
              >
                <User size={15} />
              </div>
            </div>

          )}

        </div>

      </aside>
    </>
  );
};
export default Sidebar;