import { useUser } from '@clerk/clerk-react';

import Sidebar from '../components/layout/Sidebar';
import ChatInput from '../components/chat/ChatInput';
import QuickActions from '../components/chat/QuickActions';
import WelcomeMessage from '../components/chat/WelcomeMessage';

export default function Home({ onSend }) {
    const { user } = useUser();

    const handleQuickAction = (label) => {
        onSend?.(label);
    };

    const userData = {
        name: user?.firstName,
        email: user?.emailAddresses?.[0]?.emailAddress,
        imageUrl: user?.imageUrl,
    };

    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center bg-white px-6">
            <Sidebar user={userData} />
            <main className="chat">
                <WelcomeMessage name={userData.name} />
                <ChatInput onSend={onSend} />
                <QuickActions onAction={handleQuickAction} />
            </main>
        </div>
    );
}