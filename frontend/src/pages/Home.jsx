import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import WelcomeMessage from "../components/chat/WelcomeMessage";
import ProjectModal from "../components/project/ProjectModal";
import History from "../components/chat/History";
import MessageBox from "../components/chat/MessageBox";

const SAMPLE_PROJECTS = [
  {
    id: "dmil-project",
    name: "DMIL Project",
    chats: [
      {
        id: "p-chat-1",
        title: "What is DMIL Theme?",
      },
      {
        id: "p-chat-2",
        title: "What is DMIL Theme?",
      },
      {
        id: "p-chat-3",
        title: "What is DMIL Theme?",
      },
    ],
  },
];

export default function Home({ onSend }) {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  /* Sidebar */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /* Sidebar Chats */
  const [chats, setChats] = useState([
    {
      id: "chat-1",
      title: "What is DMIL Theme?",
      pinned: false,
    },
    {
      id: "chat-2",
      title: "What is DMIL Theme?",
      pinned: false,
    },
    {
      id: "chat-3",
      title: "What is DMIL Theme?",
      pinned: false,
    },
  ]);

  const pinnedChats = chats.filter((chat) => chat.pinned);

  const recentChats = chats.filter((chat) => !chat.pinned);

  const handleTogglePin = (chatId) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              pinned: !chat.pinned,
            }
          : chat,
      ),
    );
  };
  /* Project Modal */
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  const [historyOpen, setHistoryOpen] = useState(false);

  const handleQuickAction = (label) => {
    handleSend(label);
  };

  const userData = {
    name: user?.firstName,
    email: user?.emailAddresses?.[0]?.emailAddress,
    imageUrl: user?.imageUrl,
  };

  const handleCreateProject = (name) => {
    setProjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        chats: [],
      },
    ]);
  };

  const handleSendInProject = (projectId, message) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              chats: [
                ...project.chats,
                {
                  id: crypto.randomUUID(),
                  title: message,
                },
              ],
            }
          : project,
      ),
    );
  };

  const [messages, setMessages] = useState([]);
  const handleSend = (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        sender: "user",
      },
    ]);

    onSend?.(message);
  };
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((open) => !open)}
        onNewChat={handleNewChat}
        onProjectsClick={() => setProjectsOpen(true)}
        onHistoryClick={() => setHistoryOpen(true)}
        pinnedChats={pinnedChats}
        recentChats={recentChats}
        onTogglePin={handleTogglePin}
        onSignInClick={() => {
          if (!isSignedIn) {
            navigate("/signup");
          }
        }}
      />

      <main
        className="flex min-h-screen min-w-0 flex-1 flex-col"
      >
        {messages.length === 0 ? (
          <div
            className="
              flex flex-1 flex-col items-center justify-end
              gap-6 px-6 pb-10
              md:justify-center md:pb-0
            "
          >
            <WelcomeMessage name={userData.name} />

            <ChatInput onSend={handleSend} />

            <div className="self-start sm:self-auto">
              <QuickActions
                actions={[
                  {
                    label: "Explain a concept",
                    onClick: () => handleQuickAction("Explain a concept"),
                  },
                  {
                    label: "Project guide",
                    onClick: () => handleQuickAction("Project guide"),
                  },
                  {
                    label: "Give me project ideas",
                    onClick: () => handleQuickAction("Give me project ideas"),
                  },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
                {messages.map((message) => (
                  <MessageBox
                    key={message.id}
                    message={message.message}
                    sender={message.sender}
                  />
                ))}
              </div>
            </div>

            <div className="shrink-0 px-6 pb-6">
              <div className="mx-auto w-full max-w-3xl">
                <ChatInput onSend={handleSend} />
              </div>
            </div>
          </div>
        )}
      </main>

      {projectsOpen && (
        <ProjectModal
          projects={projects}
          onClose={() => setProjectsOpen(false)}
          onCreateProject={handleCreateProject}
          onSendInProject={handleSendInProject}
          onSelectChat={(projectId, chatId) =>
            console.log("Open chat:", chatId, "in project:", projectId)
          }
        />
      )}

      {historyOpen && <History onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}
