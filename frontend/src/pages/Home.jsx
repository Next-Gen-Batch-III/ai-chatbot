import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import WelcomeMessage from "../components/chat/WelcomeMessage";
import ProjectModal from "../components/project/ProjectModal";
import History from "../components/chat/History";
import SignInCard from "../components/auth/Signincard";

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
  const { user } = useUser();

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
          : chat
      )
    );
  };
  const [signInOpen, setSignInOpen] = useState(false);
  /* Project Modal */
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  /* History Modal */
  const [historyOpen, setHistoryOpen] = useState(false);

  /* Quick Actions */
  const handleQuickAction = (label) => {
    onSend?.(label);
  };

  /* User Data */
  const userData = {
    name: user?.firstName,
    email: user?.emailAddresses?.[0]?.emailAddress,
    imageUrl: user?.imageUrl,
  };

  /* Create Project */
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

  /* Send Message Inside Project */
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
          : project
      )
    );
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() =>
          setSidebarOpen((open) => !open)
        }
        onNewChat={() => onSend?.("")}
        onProjectsClick={() =>
          setProjectsOpen(true)
        }
        onHistoryClick={() =>
          setHistoryOpen(true)
        }
        pinnedChats={pinnedChats}
        recentChats={recentChats}
        onTogglePin={handleTogglePin}
        onSignInClick={() => setSignInOpen(true)}
      />

      {/* Main Content */}
      <main
        className={`
          flex min-h-screen flex-1
          flex-col items-center
          justify-end
          gap-6 px-6 pb-10
          transition-all duration-300

          md:justify-center
          md:pb-0

          ${sidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        {/* Welcome */}
        <WelcomeMessage name={userData.name} />

        {/* Chat Input */}
        <ChatInput onSend={onSend} />

        {/* Quick Actions */}
        <div className="self-start sm:self-auto">
          <QuickActions
            actions={[
              {
                label: "Explain a concept",
                onClick: () =>
                  handleQuickAction(
                    "Explain a concept"
                  ),
              },
              {
                label: "Project guide",
                onClick: () =>
                  handleQuickAction(
                    "Project guide"
                  ),
              },
              {
                label: "Give me project ideas",
                onClick: () =>
                  handleQuickAction(
                    "Give me project ideas"
                  ),
              },
            ]}
          />
        </div>
      </main>

      {/* Project Modal */}
      {projectsOpen && (
        <ProjectModal
          projects={projects}
          onClose={() =>
            setProjectsOpen(false)
          }
          onCreateProject={handleCreateProject}
          onSendInProject={handleSendInProject}
          onSelectChat={(projectId, chatId) =>
            console.log(
              "Open chat:",
              chatId,
              "in project:",
              projectId
            )
          }
        />
      )}

      {/* History Modal */}
      {historyOpen && (
        <History
          onClose={() =>
            setHistoryOpen(false)
          }
        />
      )}
      {signInOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            px-4
          "
          onClick={() => setSignInOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SignInCard
              onClose={() => setSignInOpen(false)}
              onContinueWithGoogle={() => {
                setSignInOpen(false);
                openSignIn();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
