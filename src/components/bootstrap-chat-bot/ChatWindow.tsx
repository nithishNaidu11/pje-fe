import React from 'react';

import {
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBIcon,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';

import { Answer } from './Answer';
import { Question } from './Question';
import { ChatWindowProps, type Conversation } from 'interfaces';
import { getViewport } from './helper';

export const ChatWindow = ({
    setOpen,
    conversation,
    onSubmit
}: ChatWindowProps) => {
    type ConversationKeysProps = Array<keyof typeof conversation>;

    const conversationKeys: ConversationKeysProps = Object.keys(conversation);

    const firstQuestion = {
        [conversationKeys[0]]: conversation[conversationKeys[0]]
    };

    const [showChatBody, setShowChatBody] = React.useState(true);
    const [currentConversation, setCurrentConversation] =
        React.useState<Conversation>({
            ...firstQuestion
        });
    const [areQuestionsOver, setAreQuestionsOver] = React.useState(false);

    const currentConversationKeys: ConversationKeysProps =
        Object.keys(currentConversation);

    const toggleCollapseCardBody = () => setShowChatBody(!showChatBody);

    const onAnswerClick = ({ key, value }: { key: string; value: string }) => {
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
        }
    };

    return (
        <MDBCol
            md="8"
            lg="6"
            xl="4"
            xs="12"
            className="position-absolute bottom-0 end-0 "
            style={{
                transform:
                    getViewport() === 'xs'
                        ? 'none'
                        : 'translateX(-5%) translateY(-5%)',
                zIndex: 1000,
                height: showChatBody
                    ? getViewport() === 'xs'
                        ? '100vh'
                        : 'calc(100vh - 40px)'
                    : 'inherit'
            }}
        >
            <MDBCard
                id="chat1"
                style={{
                    borderRadius: '15px',
                    height: 'inherit',
                    overflowY: 'scroll'
                }}
            >
                <MDBCardHeader
                    className="d-flex justify-content-between align-items-center p-3 text-white border-bottom-0"
                    style={{
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                        backgroundColor: '#3445a2'
                    }}
                >
                    <MDBBtn
                        style={{
                            backgroundColor: '#3445a2',
                            boxShadow: 'none'
                        }}
                        tag="a"
                        floating
                        onClick={toggleCollapseCardBody}
                    >
                        <MDBIcon
                            fas
                            icon={showChatBody ? 'angle-down' : 'angle-up'}
                        />
                    </MDBBtn>

                    <p className="mb-0 fw-bold">Chat Bot</p>
                    <MDBBtn
                        tag="a"
                        floating
                        onClick={() => {
                            setOpen(false);
                        }}
                        style={{
                            backgroundColor: '#3445a2',
                            boxShadow: 'none'
                        }}
                    >
                        <MDBIcon fas icon="times" />
                    </MDBBtn>
                </MDBCardHeader>

                <MDBCollapse show={showChatBody}>
                    <MDBCardBody
                        style={{
                            overflowY: 'scroll'
                        }}
                    >
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
                                        onAnswerClick={onAnswerClick}
                                        answer={
                                            currentConversation[
                                                questionKey as keyof Conversation
                                            ].question.answer?.value
                                        }
                                        parentKey={questionKey as string}
                                    />
                                    {currentConversation[
                                        questionKey as keyof Conversation
                                    ].question.answer && (
                                        <Answer
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
                        {areQuestionsOver && (
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
                        )}
                    </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
        </MDBCol>
    );
};
