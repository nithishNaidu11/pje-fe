import React from 'react';
import { data } from 'data';
import { ChatContainerProps, Conversation } from 'interfaces';
import { ChatIcon } from './ChatIcon';
import { ChatWindow } from './ChatWindow';

const conversation: Conversation = data;

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
                />
            )}
        </>
    );
};
