import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { PushNotification } from 'containers';

import { JobQueryDetails } from '../components/jobQuery/JobQueryDetails';
import {
    useGetFormFields,
    useGetOpenJobQuery,
    useMarkInterested,
    useIsMobile,
    useSubmitAnswers
} from 'hooks';

import { ChatWindow } from '../components/bootstrap-chat-bot';
import { Conversation } from 'interfaces';

import {
    JobQueryCheckInterestFooter,
    JobQueryCheckInterestHeader,
    JobQueryShortlistWorkerForm,
    JobQuerySuccessView
} from 'components/jobQuery';
import { JOB_QUERY_MARK_STATUS } from 'Enum';

export const JobQueryCheckInterestContainer = () => {
    const formFields = useGetFormFields();
    const isMobile = useIsMobile();
    const { shortcode } = useParams();
    const location = useLocation();
    const markInterested = useMarkInterested();
    const submitAnswers = useSubmitAnswers();

    const [showLoader, setShowLoader] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);
    const [isWorkerShortlisted, setIsWorkerShortlisted] = React.useState(false);

    React.useEffect(() => {
        setIsWorkerShortlisted(!location.pathname.startsWith('/job/'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { data: jobQuery } = useGetOpenJobQuery({
        shortcode,
        enabled: !!shortcode
    });

    const handleClose = () => {
        setShowLoader(false);
    };

    const onMarkInterestStatus = (interestStatus: JOB_QUERY_MARK_STATUS) => {
        if (shortcode) {
            setShowLoader(true);
            markInterested.mutate(
                {
                    companyId: jobQuery.companyId,
                    shortcode,
                    interestStatus
                },
                {
                    onSuccess: () => {
                        setShowLoader(false);
                        setShowSuccessMessage(true);
                        if (interestStatus === 'INTERESTED') setShowChat(true);
                    },
                    onError: () => {
                        setShowLoader(false);
                    }
                }
            );
        }
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

        if (shortcode) {
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
            {jobQuery && formFields?.data && (
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
                                {markInterested.isLoading && (
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
                                {isWorkerShortlisted ? (
                                    <Paper
                                        sx={{ p: 2 }}
                                        elevation={isMobile ? 0 : 2}
                                    >
                                        <JobQueryCheckInterestHeader
                                            companyName={jobQuery.companyName}
                                            companyLogo={jobQuery.companyLogo}
                                            title={jobQuery.title}
                                            header={jobQuery.header}
                                        />
                                        <JobQueryDetails
                                            jobQuery={jobQuery}
                                            formFields={formFields.data}
                                        />
                                        <JobQueryCheckInterestFooter
                                            onMarkInterestStatus={
                                                onMarkInterestStatus
                                            }
                                        />
                                    </Paper>
                                ) : (
                                    <>
                                        {jobQuery && (
                                            <JobQueryShortlistWorkerForm
                                                companyName={
                                                    jobQuery.companyName
                                                }
                                                companyLogo={
                                                    jobQuery.companyLogo
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
