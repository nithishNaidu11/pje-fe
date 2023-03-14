import React from 'react';

import { AnswerBadge } from './AnswerBadge';
import { Question } from './Question';
import { ChatWindowProps, type Conversation } from 'interfaces';
import { getViewport } from './helper';
import { ConfirmationDialog } from './ConfirmationDialog';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { ChatHeader } from './ChatHeader';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ChatWindow = ({
    setOpen,
    conversation,
    onSubmit
}: ChatWindowProps) => {
    type ConversationKeysProps = Array<keyof typeof conversation>;

    const conversationKeys: ConversationKeysProps = Object.keys(conversation);

    const firstQuestion =
        conversationKeys.length > 0
            ? {
                  [conversationKeys[0]]: conversation[conversationKeys[0]]
              }
            : {};

    const [showChatBody, setShowChatBody] = React.useState(true);
    const [currentConversation, setCurrentConversation] =
        React.useState<Conversation>({
            ...firstQuestion
        });
    const [areQuestionsOver, setAreQuestionsOver] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const ref = React.useRef<HTMLDivElement>();

    const currentConversationKeys: ConversationKeysProps = Object.keys(
        currentConversation || {}
    );

    const toggleCollapseChatBody = () => setShowChatBody(!showChatBody);

    const scrollToBottom = () => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onSelectAnswer = ({ key, value }: { key: string; value: string }) => {
        const answer = currentConversation[key].question.options.find(
            (option: { label: string; value: string; next: string | null }) =>
                option.value === value
        );
        const modifiedConversation = {
            ...currentConversation,
            [key]: {
                ...currentConversation[key],
                question: {
                    ...currentConversation[key].question,
                    answer
                }
            }
        };

        const nextQuestionKey: string | null = currentConversation[key].next;

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
        onSubmit(modifiedConversation);
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
                            return (
                                <React.Fragment key={index}>
                                    <Question
                                        msg={
                                            currentConversation[
                                                questionKey as keyof Conversation
                                            ].question.msg
                                        }
                                        options={
                                            currentConversation[
                                                questionKey as keyof Conversation
                                            ].question.options
                                        }
                                        onAnswerClick={onSelectAnswer}
                                        answerValue={
                                            currentConversation[
                                                questionKey as keyof Conversation
                                            ].question.answer?.value
                                        }
                                        parentKey={questionKey as string}
                                    />
                                    {currentConversation[
                                        questionKey as keyof Conversation
                                    ].question.answer && (
                                        <AnswerBadge
                                            answer={
                                                currentConversation[
                                                    questionKey as keyof Conversation
                                                ].question.answer
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
