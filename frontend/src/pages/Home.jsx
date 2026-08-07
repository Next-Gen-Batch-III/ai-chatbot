import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';

import Sidebar from '../components/layout/Sidebar';
import ChatInput from '../components/chat/ChatInput';
import QuickActions from '../components/chat/QuickActions';
import WelcomeMessage from '../components/chat/WelcomeMessage';
import ProjectModal from '../components/project/ProjectModal';

const SAMPLE_PROJECTS = [
  {
    id: "dmil-project",
    name: "DMIL Project",
    chats: [
      { id: "p-chat-1", title: "What is DMIL Theme ?" },
      { id: "p-chat-2", title: "What is DMIL Theme ?" },
      { id: "p-chat-3", title: "What is DMIL Theme ?" },
    ],
  },
];

export default function Home({ onSend }) {
    const { user } = useUser();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [projectsOpen, setProjectsOpen] = useState(false);
    const [projects, setProjects] = useState(SAMPLE_PROJECTS);

    const handleQuickAction = (label) => {
        onSend?.(label);
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
            : project
        )
        );
    };
    return (
        <div className="flex h-full bg-white">
            <Sidebar
                user={userData} 
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen((open) => !open)}
                onNewChat={() => onSend?.("")}
                onProjectsClick={() => setProjectsOpen(true)}
                onHistoryClick={() => {}}
                />
            <main className={`flex flex-1 flex-col items-center justify-end gap-6 px-6 pb-10 transition-all duration-300 sm:justify-center sm:pb-0 ${
                 sidebarOpen ? "md:ml-64" : "md:ml-16"
                }`}
            >
                <WelcomeMessage name={userData.name} />
                <ChatInput onSend={onSend} />
                <div className="self-start sm:self-auto">
                    <QuickActions actions={[                   
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
                    ]} />
                </div>
            </main>
            {projectsOpen && (
                <ProjectModal
                projects={projects}
                onClose={() => setProjectsOpen(false)}
                onCreateProject={handleCreateProject}
                onSendInProject={handleSendInProject}
                onSelectChat={(projectId, chatId) =>
                    console.log("Open chat", chatId, "in project", projectId)
                }
                />
            )}
        </div>
    );
}