import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';

interface ChatHeaderProps {
    toggleCollapseChatBody: VoidFunction;
    showChatBody: boolean;
    areQuestionsOver: boolean;
    setOpen: (_: boolean) => void;
    setShowConfirmation: (_: boolean) => void;
}

export const ChatHeader = ({
    toggleCollapseChatBody,
    showChatBody,
    areQuestionsOver,
    setOpen,
    setShowConfirmation
}: ChatHeaderProps) => {
    return (
        <CardHeader
            color="white"
            action={
                <>
                    <IconButton
                        aria-label="settings"
                        onClick={toggleCollapseChatBody}
                    >
                        {showChatBody ? (
                            <ExpandMoreIcon sx={{ color: 'white' }} />
                        ) : (
                            <ExpandLessIcon sx={{ color: 'white' }} />
                        )}
                    </IconButton>
                    <IconButton
                        aria-label="settings"
                        onClick={() => {
                            if (areQuestionsOver) {
                                setOpen(false);
                            } else {
                                setShowConfirmation(true);
                            }
                        }}
                    >
                        <ClearIcon sx={{ color: 'white' }} />
                    </IconButton>
                </>
            }
            title="Chat"
            sx={{ backgroundColor: '#3445a2', color: 'white' }}
        />
    );
};
