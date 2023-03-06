import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import { PushNotification } from 'containers';

import { useGetFormFields, useGetOpenJobQuery, useSubmitAnswers } from 'hooks';

import { ChatWindow } from '../components/bootstrap-chat-bot';
import { Conversations, QuestionsProps } from 'interfaces';
import { QUESTION_TYPE, FORM_FIELD } from 'Enum';
import { DataUtils } from 'utils';

import {
    JobQueryCheckInterestForm,
    JobQueryShortlistWorkerForm,
    JobQuerySuccessView
} from 'components/jobQuery';

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
        result[profileQuestionIds[profileQuestionIds.length - 1]].next =
            result[qualificationQuestionIds[0]].id;
        return result;
    }, [formFields, jobQuery, profileQuestionIds, qualificationQuestionIds]);

    const handleClose = () => {
        setShowLoader(false);
    };

    const onSubmitAnswers = (currentConversation: Conversations) => {
        const answers = Object.values(currentConversation).reduce(
            (acc, val) => {
                if (
                    val.question.answer &&
                    val.type.toUpperCase() !== QUESTION_TYPE.FILE_UPLOAD_LINK
                ) {
                    if (profileQuestionIds.find(id => id === val.id)) {
                        acc.profileUpdateAnswers = {
                            ...acc.profileUpdateAnswers,
                            [val.key]:
                                val.type == QUESTION_TYPE.MULTI_SELECT
                                    ? val.question.answer.split(', ')
                                    : val.question.answer
                        };
                    } else {
                        acc.qualificationAnswers = {
                            ...acc.qualificationAnswers,
                            [val.key]:
                                val.type == QUESTION_TYPE.MULTI_SELECT
                                    ? val.question.answer.split(', ')
                                    : val.question.answer
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

    const onFileUpload = (_file: File) => {
        // uploadDocument.mutate(
        //     {
        //         companyId,
        //         documentType: DOCUMENT_TYPE.CV,
        //         file: file,
        //         workerId: workerData?.workerId
        //     },
        //     {
        //         onSuccess() {
        //             setIsFileUploaded(true);
        //         },
        //         onError(err) {
        //             showError({ message: err.errors.displayError });
        //         }
        //     }
        // );
    };

    return (
        <>
            {jobQuery && (
                <Grid
                    id="parent"
                    container
                    justifyContent="center"
                    alignContent="center"
                    height={'calc(100vh - 40px)'}
                >
                    <Grid item md={5} xs={12}>
                        {showSuccessMessage ? (
                            <>
                                <JobQuerySuccessView />
                                <PushNotification shortcode={shortcode} />
                            </>
                        ) : (
                            <>
                                {showLoader && (
                                    <Backdrop
                                        sx={{
                                            color: '#fff',
                                            zIndex: theme =>
                                                theme.zIndex.drawer + 1
                                        }}
                                        open={showLoader}
                                        onClick={handleClose}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                )}
                                {isWorkerShortlisted && shortcode ? (
                                    <JobQueryCheckInterestForm
                                        jobQuery={jobQuery}
                                        shortcode={shortcode}
                                        setShowLoader={setShowLoader}
                                        setShowSuccessMessage={
                                            setShowSuccessMessage
                                        }
                                        setShowChat={setShowChat}
                                    />
                                ) : (
                                    <>
                                        {jobQuery && (
                                            <JobQueryShortlistWorkerForm
                                                companyName={
                                                    jobQuery.companyName ||
                                                    'Hunar'
                                                }
                                                companyLogo={
                                                    jobQuery.companyLogo ||
                                                    'https://storage.googleapis.com/public_bocket/hunar-logo512.png'
                                                }
                                                companyId={jobQuery.companyId}
                                                jobQueryId={jobQuery.jobQueryId}
                                                setIsWorkerShortlisted={
                                                    setIsWorkerShortlisted
                                                }
                                                setShowLoader={setShowLoader}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {showChat && questions && (
                            <ChatWindow
                                setOpen={setShowChat}
                                conversation={questions}
                                onSubmit={onSubmitAnswers}
                                onFileUpload={onFileUpload}
                                isFileUploading={false}
                            />
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
