import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import { PushNotification } from 'containers';

import { useGetOpenJobQuery, useSubmitAnswers } from 'hooks';

import { ChatWindow } from '../components/bootstrap-chat-bot';
import { Conversation } from 'interfaces';

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

    const { data: jobQuery } = useGetOpenJobQuery({
        shortcode,
        enabled: !!shortcode
    });

    const handleClose = () => {
        setShowLoader(false);
    };

    const onSubmitAnswers = (currentConversation: Conversation) => {
        const answers = Object.keys(currentConversation).reduce((acc, key) => {
            acc = {
                ...acc,
                [currentConversation[key].key]:
                    currentConversation[key].question.answer?.value
            };
            return acc;
        }, {});

        if (shortcode && jobQuery) {
            submitAnswers.mutate(
                {
                    companyId: jobQuery.companyId,
                    jobQueryId: jobQuery.jobQueryId,
                    shortcode,
                    answers: answers
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
                        {showChat && (
                            <ChatWindow
                                setOpen={setShowChat}
                                conversation={jobQuery.questions}
                                onSubmit={onSubmitAnswers}
                            />
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
