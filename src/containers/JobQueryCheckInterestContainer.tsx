import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { PushNotification } from 'containers';

import {
    useGetFormFields,
    useGetOpenJobQuery,
    useSubmitAnswers,
    useUploadJQDocument
} from 'hooks';

import { ChatWindow } from '../components/bootstrap-chat-bot';
import { ConversationsProps, QuestionsProps } from 'interfaces';
import { QUESTION_TYPE, FORM_FIELD, DOCUMENT_TYPE } from 'Enum';
import { DataUtils } from 'utils';

import {
    JobQueryCheckInterestForm,
    JobQueryShortlistWorkerForm,
    JobQuerySuccessView
} from 'components/jobQuery';
import { CenteredContainer } from 'components/common';

export const JobQueryCheckInterestContainer = () => {
    const { shortcode } = useParams();
    const location = useLocation();

    const submitAnswers = useSubmitAnswers();
    const [searchParams] = useSearchParams();

    const [showLoader, setShowLoader] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);
    const [isWorkerShortlisted, setIsWorkerShortlisted] = React.useState(false);

    React.useEffect(() => {
        setIsWorkerShortlisted(!location.pathname.startsWith('/job/'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (searchParams.has('s') && searchParams.get('s') === 'b') {
            setShowChat(true);
            setShowSuccessMessage(true);
        }
    }, [searchParams, setShowChat]);

    const { data: formFields } = useGetFormFields();
    const { data: jobQuery } = useGetOpenJobQuery({
        shortcode,
        enabled: !!shortcode
    });
    const uploadDocument = useUploadJQDocument();

    const profileQuestionIds = React.useMemo(
        () =>
            jobQuery ? Object.keys(jobQuery.profileUpdateQuestions).sort() : [],
        [jobQuery]
    );

    const qualificationQuestionIds = React.useMemo(
        () => (jobQuery ? Object.keys(jobQuery.questions).sort() : []),
        [jobQuery]
    );

    const questions = React.useMemo(() => {
        if (!jobQuery || !formFields) return;
        const result: QuestionsProps = {
            ...Object.entries(jobQuery.profileUpdateQuestions).reduce(
                (acc, [key, val]) => {
                    if (val.question.optionsKey) {
                        val.question.options =
                            formFields[
                                DataUtils.toCamel(
                                    val.question.optionsKey
                                ) as FORM_FIELD
                            ];
                    }
                    return { ...acc, [key]: val };
                },
                {}
            ),
            ...jobQuery.questions
        };
        if (result[profileQuestionIds[profileQuestionIds.length - 1]])
            result[profileQuestionIds[profileQuestionIds.length - 1]].next =
                result[qualificationQuestionIds[0]]?.id || null;
        return result;
    }, [formFields, jobQuery, profileQuestionIds, qualificationQuestionIds]);

    const handleClose = () => {
        setShowLoader(false);
    };

    const onSubmitAnswers = (currentConversation: ConversationsProps) => {
        const answers = Object.values(currentConversation).reduce(
            (acc, val) => {
                if (
                    val.question.answer &&
                    val.type.toUpperCase() !== QUESTION_TYPE.FILE_UPLOAD_LINK
                ) {
                    if (profileQuestionIds.find(id => id === val.id)) {
                        acc.profileUpdateAnswers = {
                            ...acc.profileUpdateAnswers,
                            [val.key]: val.question.answer
                        };
                    } else {
                        acc.qualificationAnswers = {
                            ...acc.qualificationAnswers,
                            [val.key]: val.question.answer
                        };
                    }
                }
                return acc;
            },
            { profileUpdateAnswers: {}, qualificationAnswers: {} }
        );

        if (shortcode && jobQuery) {
            submitAnswers.mutate(
                {
                    companyId: jobQuery.companyId,
                    jobQueryId: jobQuery.jobQueryId,
                    shortcode,
                    ...answers
                },
                {
                    onSuccess: () => {
                        setShowLoader(false);
                        setShowSuccessMessage(true);
                    },
                    onError: () => {
                        setShowLoader(false);
                    }
                }
            );
        }
    };

    if (!jobQuery) return <></>;

    const onFileUpload = (file: File) => {
        if (shortcode && jobQuery) {
            setShowLoader(true);
            uploadDocument.mutate(
                {
                    params: {
                        companyId: jobQuery.companyId,
                        jobQueryId: jobQuery.jobQueryId
                    },

                    documentType: DOCUMENT_TYPE.CV,
                    file: file,
                    shortcode
                },
                {
                    onSuccess() {
                        setShowLoader(false);
                    },
                    onError() {
                        setShowLoader(false);
                    }
                }
            );
        }
    };

    return (
        <>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: theme => theme.zIndex.drawer + 1
                }}
                open={showLoader}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {showSuccessMessage ? (
                <CenteredContainer>
                    <JobQuerySuccessView />
                    <PushNotification shortcode={shortcode} />
                </CenteredContainer>
            ) : isWorkerShortlisted ? (
                <CenteredContainer>
                    {shortcode && (
                        <JobQueryCheckInterestForm
                            jobQuery={jobQuery}
                            shortcode={shortcode}
                            setShowLoader={setShowLoader}
                            setShowSuccessMessage={setShowSuccessMessage}
                            setShowChat={setShowChat}
                        />
                    )}
                </CenteredContainer>
            ) : (
                <JobQueryShortlistWorkerForm
                    companyName={jobQuery.companyName || 'Hunar'}
                    jobTitle={jobQuery.title}
                    companyLogo={
                        jobQuery.companyLogo ||
                        'https://storage.googleapis.com/public_bocket/hunar-logo512.png'
                    }
                    companyId={jobQuery.companyId}
                    jobQueryId={jobQuery.jobQueryId}
                    setIsWorkerShortlisted={setIsWorkerShortlisted}
                    setShowLoader={setShowLoader}
                />
            )}
            {showChat &&
                questions &&
                (!!profileQuestionIds.length ||
                    !!qualificationQuestionIds.length) && (
                    <ChatWindow
                        setOpen={setShowChat}
                        conversation={jobQuery.questions}
                        onSubmit={onSubmitAnswers}
                        onFileUpload={onFileUpload}
                        isFileUploading={uploadDocument.isLoading}
                    />
                )}
        </>
    );
};
