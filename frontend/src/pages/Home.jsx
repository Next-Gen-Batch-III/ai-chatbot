import {useState} from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChatInput from '../components/chat/ChatInput';
import QuickActions from '../components/chat/QuickActions';
import WelcomeMessage from '../components/chat/WelcomeMessage';

export default function Home({ user = { name: "Guest"}, onSend }) {
    const handleQuickAction = (label) => {
        onSend?.(label);
    };
    return (
        <div className="flex min-h-screen bg-white">
           <Sidebar user={user} />
                <main className="flex flex-1 flex-col items-center justify-center px-6 gap-6">
                    <WelcomeMessage name={user.name} />
                    <ChatInput onSend={onSend}/>
                    <QuickActions
                        actions={[
                            { label: "Explain a concept", onClick: () => handleQuickAction("Explain a concept") },
                            { label: "Project guide", onClick: () => handleQuickAction("Project guide") },
                            { label: "Give me  project ideas", onClick: () => handleQuickAction("Give me  project ideas") },
                        ]}
                    />
                </main>
        </div>
    );
}