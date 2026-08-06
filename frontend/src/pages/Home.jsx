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
        <div className="flex h-full flex-1 flex-col items-center justify-center bg-white px-6">
            <Sidebar user={user} />
            <main className="chat">
                <WelcomeMessage name={user.name} />
                <ChatInput onSend={onSend} />
                <QuickActions onAction={handleQuickAction} />
            </main>
        </div>
    );
}