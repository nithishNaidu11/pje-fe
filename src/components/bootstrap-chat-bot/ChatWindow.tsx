import React from 'react';

import { AnswerBadge } from './AnswerBadge';
import { Question } from './Question';
import { type Conversations } from 'interfaces';
import { getViewport } from './helper';
import { ConfirmationDialog } from './ConfirmationDialog';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { ChatHeader } from './ChatHeader';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FIELD_TYPE } from 'Enum';

type ConversationKeysProps = Array<keyof Conversations>;

export interface ChatWindowProps {
    setOpen: (_: boolean) => void;
    conversation: Conversations;
    isFileUploading: boolean;
    onSubmit: (currentConversation: Conversations) => void;
    onFileUpload: (_: File) => void;
}

export const ChatWindow = ({
    setOpen,
    conversation,
    isFileUploading,
    onSubmit,
    onFileUpload
}: ChatWindowProps) => {
    const conversationKeys: ConversationKeysProps = Object.keys(conversation);
    const firstQuestion = {
        [conversationKeys[0]]: conversation[conversationKeys[0]]
    };

    const [showChatBody, setShowChatBody] = React.useState(true);
    const [currentConversation, setCurrentConversation] =
        React.useState<Conversations>({
            ...firstQuestion
        });
    const [areQuestionsOver, setAreQuestionsOver] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const ref = React.useRef<HTMLDivElement>();

    const currentConversationKeys: ConversationKeysProps =
        Object.keys(currentConversation);

    const toggleCollapseChatBody = () => setShowChatBody(!showChatBody);

    const scrollToBottom = () => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onAnswerClick = ({ key, value }: { key: string; value: string }) => {
        const currentQuestion = currentConversation[key];
        let answer = undefined;
        if (
            currentQuestion.type === FIELD_TYPE.SINGLE_SELECT ||
            currentQuestion.type === FIELD_TYPE.YES_NO
        ) {
            answer = currentQuestion.question.options.find(
                option => option.value === value
            )?.value;
        } else {
            answer = value;
        }

        const modifiedConversation = {
            ...currentConversation,
            [key]: {
                ...currentQuestion,
                question: {
                    ...currentQuestion.question,
                    answer
                }
            }
        };

        const nextQuestionKey: string | null = currentQuestion.next;

        if (nextQuestionKey) {
            const nextQuestion = {
                [nextQuestionKey]: conversation[nextQuestionKey]
            };
            setCurrentConversation({
                ...modifiedConversation,
                ...nextQuestion
            });
        } else {
            setCurrentConversation({ ...modifiedConversation });
            setAreQuestionsOver(true);
            setOpen(false);
        }
        if (
            currentQuestion.type.toUpperCase() !== FIELD_TYPE.FILE_UPLOAD_LINK
        ) {
            onSubmit(modifiedConversation);
        }
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);

    return (
        <>
            <Card
                sx={{
                    width: getViewport() === 'xs' ? '100%' : 345,
                    position: 'absolute',
                    right: getViewport() === 'xs' ? 0 : 50,
                    bottom: getViewport() === 'xs' ? 0 : 20,
                    zIndex: 1000,
                    // transform:
                    //     getViewport() === 'xs'
                    //         ? 'none'
                    //         : 'translateX(-5%) translateY(-5%)',
                    height: showChatBody
                        ? getViewport() === 'xs'
                            ? '100%'
                            : 'calc(100vh - 40px)'
                        : 'inherit'
                }}
                elevation={4}
            >
                <ChatHeader
                    toggleCollapseChatBody={toggleCollapseChatBody}
                    showChatBody={showChatBody}
                    areQuestionsOver={areQuestionsOver}
                    setOpen={setOpen}
                    setShowConfirmation={setShowConfirmation}
                />
                <Collapse orientation="vertical" in={showChatBody}>
                    <CardContent
                        sx={{
                            maxHeight: 'calc(100vh - 140px)',
                            overflowY: 'scroll'
                        }}
                    >
                        <Grid container justifyContent="center" mb={2}>
                            <Box
                                p={1.5}
                                style={{
                                    borderRadius: '15px',
                                    backgroundColor: '#e0e0e0',
                                    border: '1px solid #6886ff'
                                }}
                            >
                                <Typography
                                    gutterBottom={false}
                                    variant="body2"
                                    component="span"
                                >
                                    {`Hello , Thank you for showing interest in
                                    the job. Complete your application by
                                    answering the below questions`}
                                </Typography>
                            </Box>
                        </Grid>

                        {currentConversationKeys.map((questionKey, index) => {
                            const currentQuestion =
                                currentConversation[questionKey];
                            return (
                                <React.Fragment key={index}>
                                    <Question
                                        msg={currentQuestion.question.msg}
                                        type={currentQuestion.type}
                                        options={
                                            currentQuestion.question.options
                                        }
                                        onAnswerClick={onAnswerClick}
                                        onFileUpload={onFileUpload}
                                        isFileUploading={isFileUploading}
                                        answerValue={
                                            currentQuestion.question.answer
                                        }
                                        parentKey={questionKey as string}
                                    />
                                    {currentQuestion.question.answer && (
                                        <AnswerBadge
                                            answer={
                                                currentQuestion.question.answer
                                            }
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                        <div ref={ref as React.RefObject<HTMLDivElement>}></div>
                        <ConfirmationDialog
                            open={showConfirmation}
                            setOpen={setShowConfirmation}
                            onSubmit={() => {
                                setOpen(false);
                                setShowConfirmation(false);
                            }}
                        />
                        {/* {areQuestionsOver && (
                            <div className="d-grid gap-2 col-12 mx-auto">
                                <MDBBtn
                                    mx-auto
                                    rounded
                                    style={{
                                        backgroundColor: '#E12D30'
                                    }}
                                    onClick={() =>
                                        onSubmit(currentConversation)
                                    }
                                >
                                    <MDBIcon
                                        className="me-2"
                                        icon="chevron-circle-right"
                                        color="white"
                                    />
                                    END CONVERSATION
                                </MDBBtn>
                            </div>
                        )} */}
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};
