import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PushNotification } from 'containers';

import { JobQueryDetails } from '../components/jobQuery/JobQueryDetails';
import {
    useGetFormFields,
    useGetOpenJobQuery,
    useMarkInterested,
    useIsMobile,
    useSubmitAnswers
} from 'hooks';

import SuccessIcon from './Success.png';

import { ChatWindow } from '../components/bootstrap-chat-bot';
import { Conversation } from 'interfaces';
import TextField from '@mui/material/TextField';
import { useShortlistedWorkers } from 'hooks/apiHooks/jobQuery/useShortlistedWorkers';

export const JobQueryCheckInterestContainer = () => {
    const formFields = useGetFormFields();

    const isMobile = useIsMobile();
    const { shortcode } = useParams();
    const location = useLocation();

    const { data: jobQuery } = useGetOpenJobQuery({
        shortcode,
        enabled: !!shortcode
    });

    const markInterested = useMarkInterested();
    const submitAnswers = useSubmitAnswers();
    const shortlistWorkers = useShortlistedWorkers();

    const [open, setOpen] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);
    const [isWorkerShortlisted, setIsWorkerShortlisted] = React.useState(false);
    const [worker, setWorker] = React.useState({
        fullName: '',
        mobileNumber: ''
    });

    React.useEffect(() => {
        setIsWorkerShortlisted(!location.pathname.startsWith('/job/'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const onMarkInterestStatus = (
        interestStatus: 'INTERESTED' | 'NOT_INTERESTED'
    ) => {
        if (shortcode) {
            setOpen(true);
            markInterested.mutate(
                {
                    companyId: jobQuery.companyId,
                    shortcode,
                    interestStatus
                },
                {
                    onSuccess: () => {
                        setOpen(false);
                        setShowSuccessMessage(true);
                        setShowChat(true);
                    },
                    onError: () => {
                        setOpen(false);
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
                        setOpen(false);
                        setShowSuccessMessage(true);
                        setShowChat(true);
                    },
                    onError: () => {
                        setOpen(false);
                    }
                }
            );
        }
    };

    const onShortlistWorker = () => {
        shortlistWorkers.mutate(
            {
                companyId: jobQuery.companyId,
                jobQueryId: jobQuery.jobQueryId,
                workers: [worker]
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    setIsWorkerShortlisted(true);
                },
                onError: () => {
                    setOpen(false);
                }
            }
        );
    };

    return (
        <>
            {jobQuery && formFields?.data && (
                <Grid
                    id="parent"
                    container
                    justifyContent="center"
                    alignContent="center"
                    height={'100vh'}
                >
                    <Grid item md={5} xs={12}>
                        {showSuccessMessage ? (
                            <Grid
                                container
                                justifyContent="center"
                                alignContent="center"
                            >
                                <Grid
                                    item
                                    md={12}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <img
                                        src={SuccessIcon}
                                        alt="success"
                                        style={{
                                            width: 136,
                                            height: 136
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Typography variant="h6" p={2}>
                                        Thank for you registering your response.
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <PushNotification shortcode={shortcode} />
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                {isWorkerShortlisted ? (
                                    <Paper
                                        sx={{ p: 2 }}
                                        elevation={isMobile ? 0 : 2}
                                    >
                                        <Typography variant="h5" mb={2}>
                                            {jobQuery.title}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            variant="body2"
                                        >
                                            {jobQuery.header}
                                        </Typography>
                                        {markInterested.isLoading && (
                                            <Backdrop
                                                sx={{
                                                    color: '#fff',
                                                    zIndex: theme =>
                                                        theme.zIndex.drawer + 1
                                                }}
                                                open={open}
                                                onClick={handleClose}
                                            >
                                                <CircularProgress color="inherit" />
                                            </Backdrop>
                                        )}

                                        <>
                                            <JobQueryDetails
                                                jobQuery={jobQuery}
                                                formFields={formFields.data}
                                            />
                                            <Typography variant="h6" my={2}>
                                                Are you interested?
                                            </Typography>

                                            <Grid
                                                container
                                                justifyContent="end"
                                                spacing={2}
                                            >
                                                {isMobile ? (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    onMarkInterestStatus(
                                                                        'INTERESTED'
                                                                    )
                                                                }
                                                                fullWidth
                                                            >
                                                                YES, INTERESTED
                                                            </Button>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={6}
                                                            xs={12}
                                                        >
                                                            <Button
                                                                variant="outlined"
                                                                onClick={() =>
                                                                    onMarkInterestStatus(
                                                                        'NOT_INTERESTED'
                                                                    )
                                                                }
                                                                fullWidth
                                                            >
                                                                NO, NOT
                                                                INTERESTED
                                                            </Button>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Grid item md={6}>
                                                            <Button
                                                                variant="outlined"
                                                                onClick={() =>
                                                                    onMarkInterestStatus(
                                                                        'NOT_INTERESTED'
                                                                    )
                                                                }
                                                                fullWidth
                                                            >
                                                                NO, NOT
                                                                INTERESTED
                                                            </Button>
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    onMarkInterestStatus(
                                                                        'INTERESTED'
                                                                    )
                                                                }
                                                                fullWidth
                                                            >
                                                                YES, INTERESTED
                                                            </Button>
                                                        </Grid>
                                                    </>
                                                )}
                                            </Grid>
                                        </>
                                    </Paper>
                                ) : (
                                    <>
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                        >
                                            <Grid item md={12} xs={8}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Full name"
                                                    name="fullName"
                                                    value={
                                                        worker.fullName || ''
                                                    }
                                                    onChange={e => {
                                                        setWorker(worker => {
                                                            return {
                                                                ...worker,
                                                                fullName:
                                                                    e.target
                                                                        .value
                                                            };
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={8}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Mobile Number"
                                                    name="mobileNumber"
                                                    value={
                                                        worker.mobileNumber ||
                                                        ''
                                                    }
                                                    onChange={e => {
                                                        setWorker(worker => {
                                                            return {
                                                                ...worker,
                                                                mobileNumber:
                                                                    e.target
                                                                        .value
                                                            };
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={8}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={onShortlistWorker}
                                                    disabled={
                                                        !worker.fullName ||
                                                        !worker.mobileNumber
                                                    }
                                                >
                                                    SUBMIT
                                                </Button>
                                            </Grid>
                                        </Grid>
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
