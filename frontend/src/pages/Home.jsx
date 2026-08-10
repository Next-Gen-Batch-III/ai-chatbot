import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import WelcomeMessage from "../components/chat/WelcomeMessage";
import ProjectModal from "../components/project/ProjectModal";
import History from "../components/chat/History";
import AccountCard from "../components/auth/AccountCard.jsx";
import MessageBox from "../components/chat/MessageBox";

import {
  createProject,
  getChats,
  getChatMessages,
  getProjects,
  toggleChatPin,
  updateChat,
} from "../api/index.js";
import { sseClient } from "../api/sseClient.js";
import { useToast } from "../hooks/useToast";

export default function Home() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { user } = useUser();

  /* Sidebar */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /* Sidebar Chats */
  const [chats, setChats] = useState([]);

  const [pinnedChats, setPinnedChats] = useState([]);

  const recentChats = chats.filter((chat) => !chat.pinned);

  const fetchChats = useCallback(async () => {
    try {
      const response = await getChats({ projectId: "null", limit: 10 });
      if (response.data.data.chats) {
        setChats(response.data.data.chats.filter((chat) => !chat.isPinned));
        setPinnedChats(
          response.data.data.chats.filter((chat) => chat.isPinned),
        );
      }
    } catch (error) {
      toast.error(error.message ?? "Failed to load chats.");
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleTogglePin = async (chatId) => {
    try {
      const response = await toggleChatPin(chatId);
      if (response.data.data) {
        const updatedChat = response.data.data;
        setChats((prevChats) => {
          if (!updatedChat.isPinned) {
            return [...prevChats, updatedChat];
          } else {
            return prevChats.filter((chat) => chat.id !== updatedChat.id);
          }
        });
        setPinnedChats((prevPinnedChats) => {
          if (updatedChat.isPinned) {
            return [...prevPinnedChats, updatedChat];
          } else {
            return prevPinnedChats.filter((chat) => chat.id !== updatedChat.id);
          }
        });
      }
    } catch (error) {
      toast.error(error.message ?? "Failed to toggle pin.");
    }
  };
  const [signInOpen, setSignInOpen] = useState(false);
  /* Project Modal */
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  /* History Modal */
  const [historyOpen, setHistoryOpen] = useState(false);

  /* Quick Actions */
  const handleQuickAction = (label) => {
    handleSend(label);
  };

  /* User Data */
  const userData = {
    name: user?.firstName,
    email: user?.emailAddresses?.[0]?.emailAddress,
    imageUrl: user?.imageUrl,
  };

  useEffect(() => {
    if (!projectsOpen) return;

    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const projectList = response.data.data ?? [];
        const projectsWithChats = await Promise.all(
          projectList.map(async (project) => {
            const chatsResponse = await getChats({ projectId: project.id, limit: 100 });
            return {
              ...project,
              name: project.title,
              chats: chatsResponse.data.data.chats ?? [],
            };
          }),
        );
        setProjects(projectsWithChats);
      } catch (error) {
        toast.error(error.message ?? "Failed to load projects.");
      }
    };

    fetchProjects();
  }, [projectsOpen]);

  const handleCreateProject = async (title) => {
    try {
      const response = await createProject({ title });
      const project = response.data.data;
      setProjects((previousProjects) => [
        ...previousProjects,
        { ...project, name: project.title, chats: [] },
      ]);
      return true;
    } catch (error) {
      toast.error(error.message ?? "Failed to create project.");
      return false;
    }
  };

  const handleAddChatToProject = async (projectId, chatId) => {
    try {
      const response = await updateChat(chatId, { projectId });
      const updatedChat = response.data.data;

      setChats((previousChats) =>
        previousChats.filter((chat) => chat.id !== updatedChat.id),
      );
      setPinnedChats((previousChats) =>
        previousChats.filter((chat) => chat.id !== updatedChat.id),
      );
      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === projectId
            ? { ...project, chats: [...project.chats, updatedChat] }
            : project,
        ),
      );
    } catch (error) {
      toast.error(error.message ?? "Failed to add chat to project.");
    }
  };
  const [messages, setMessages] = useState([]);
  const [loadedChatId, setLoadedChatId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const newChatIdRef = useRef(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    let isCurrentChat = true;

    abortRef.current?.abort();
    newChatIdRef.current = null;

    const fetchMessages = async () => {
      if (!chatId) return;

      try {
        const response = await getChatMessages(chatId);
        const chatMessages = Array.isArray(response.data)
          ? response.data
          : (response.data.data ?? []);

        if (isCurrentChat) {
          setMessages(chatMessages);
          setLoadedChatId(chatId);
        }
      } catch (error) {
        if (isCurrentChat) {
          toast.error(error.message ?? "Failed to load messages.");
        }
      }
    };

    fetchMessages();

    return () => {
      isCurrentChat = false;
    };
  }, [chatId]);

  const handleSend = async (prompt) => {
    if (!prompt.trim() || isStreaming) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), content: prompt, type: "USER_INPUT" },
    ]);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, content: "", type: "MODEL_OUTPUT" },
    ]);

    setIsStreaming(true);
    newChatIdRef.current = null;
    const apiRoute = chatId ? `/api/chats/${chatId}/messages` : "/api/chats";

    try {
      await sseClient.post(
        apiRoute,
        { prompt },
        {
          signal: controller.signal,
          onEvent(event) {
            if (event.type === "start" && !chatId) {
              newChatIdRef.current = event.chatId;
            }

            if (event.type === "text") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.content }
                    : m,
                ),
              );
            }
          },
        },
      );

      if (newChatIdRef.current) {
        navigate(`/chat/${newChatIdRef.current}`, { replace: true });
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      // Remove the empty assistant placeholder and show the error as a toast.
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      toast.error(err.message ?? "Failed to get a response.");
    } finally {
      const isFirstInPinnedChats = pinnedChats[0]?.id === chatId;
      const isFirstInRecentChats = recentChats[0]?.id === chatId;

      if(!isFirstInPinnedChats && !isFirstInRecentChats) {
        fetchChats();
      }
      setIsStreaming(false);
    }
  };
  const handleNewChat = () => {
    setMessages([]);
    setLoadedChatId(null);
    navigate("/");
  };

  const activeMessages = loadedChatId === chatId ? messages : [];

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((open) => !open)}
        onNewChat={handleNewChat}
        onProjectsClick={() => setProjectsOpen(true)}
        onHistoryClick={() => setHistoryOpen(true)}
        pinnedChats={pinnedChats}
        recentChats={recentChats}
        onTogglePin={handleTogglePin}
        onSignInClick={() => setSignInOpen(true)}
      />

      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        {activeMessages.length === 0 ? (
          /* ================= EMPTY CHAT ================= */
          <div
            className="
              flex flex-1 flex-col items-center justify-end
              gap-6 px-6 pb-10
              md:justify-center md:pb-0
            "
          >
            {/* Welcome */}
            <WelcomeMessage name={userData.name} />

            {/* Chat Input */}
            <ChatInput onSend={handleSend} disabled={isStreaming} />

            {/* Quick Actions */}
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
          /* ================= CHAT MODE ================= */
          <div className="flex h-screen flex-col overflow-y-hidden">
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
                {activeMessages.map((message) => (
                  <MessageBox
                    key={message.id}
                    message={message.content}
                    sender={message.type}
                  />
                ))}
              </div>
            </div>

            {/* Chat Input - stays at bottom */}
            <div className="shrink-0 px-6 pb-6">
              <div className="mx-auto w-full max-w-3xl">
                <ChatInput onSend={handleSend} disabled={isStreaming} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Project Modal */}
      {projectsOpen && (
        <ProjectModal
          projects={projects}
          onClose={() => setProjectsOpen(false)}
          onCreateProject={handleCreateProject}
          availableChats={[...pinnedChats, ...chats].filter((chat) => !chat.projectId)}
          onAddChat={handleAddChatToProject}
          onSelectChat={(_, selectedChatId) => {
            setProjectsOpen(false);
            navigate(`/chat/${selectedChatId}`);
          }}
        />
      )}

      {/* History Modal */}
      {historyOpen && <History onClose={() => setHistoryOpen(false)} />}
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
            <AccountCard onClose={() => setSignInOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
