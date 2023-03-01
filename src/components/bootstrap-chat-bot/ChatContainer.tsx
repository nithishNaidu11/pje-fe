import React from 'react';
import { data } from 'data';
import { Conversations } from 'interfaces';
import { ChatIcon } from './ChatIcon';
import { ChatWindow } from './ChatWindow';

const conversation: Conversations = data;

interface ChatContainerProps {
    icon: string;
}

export const ChatContainer = ({ icon }: ChatContainerProps) => {
    const [isChatWindowOpen, setisChatWindowOpen] = React.useState(false);

    const handleOnChatIconClick = () => {
        setisChatWindowOpen(true);
    };
    return (
        <>
            <ChatIcon
                icon={icon}
                open={isChatWindowOpen}
                onClick={handleOnChatIconClick}
            />
            {isChatWindowOpen && (
                <ChatWindow
                    setOpen={setisChatWindowOpen}
                    conversation={conversation}
                    onSubmit={() => undefined}
                    onFileUpload={() => undefined}
                    isFileUploading={false}
                />
            )}
        </>
    );
};
