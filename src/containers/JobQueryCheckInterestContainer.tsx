import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
import { Conversation, ShortlistWorkerProps, Worker } from 'interfaces';

import { useShortlistedWorkers } from 'hooks/apiHooks/jobQuery/useShortlistedWorkers';
import { JobQueryShortlistWorkerForm } from 'components/jobQuery';
import Divider from '@mui/material/Divider';

export const JobQueryCheckInterestContainer = () => {
    const formFields = useGetFormFields();

    const isMobile = useIsMobile();
    const { shortcode } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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

    const { data: jobQuery } = useGetOpenJobQuery({
        shortcode,
        enabled: !!shortcode
    });

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
                        if (interestStatus === 'INTERESTED') setShowChat(true);
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
                onSuccess: (data: { workers: Worker[] }) => {
                    setOpen(false);
                    setIsWorkerShortlisted(true);
                    navigate(`/${data.workers[0]?.shortcode}`);
                },
                onError: () => {
                    setOpen(false);
                }
            }
        );
    };

    const onWorkerChange = (modifiedWorker: Partial<ShortlistWorkerProps>) => {
        setWorker(worker => {
            return {
                ...worker,
                ...modifiedWorker
            };
        });
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
                                    <Typography
                                        variant="h6"
                                        p={2}
                                        textAlign="center"
                                    >
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
                                        <Grid
                                            container
                                            pb={4}
                                            justifyContent="center"
                                        >
                                            <Grid item md={12} xs={12}>
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={jobQuery.companyLogo}
                                                ></img>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    mb={2}
                                                    gutterBottom={false}
                                                >
                                                    {jobQuery.companyName}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Divider />
                                            </Grid>
                                        </Grid>
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
                                            pb={4}
                                            justifyContent="center"
                                        >
                                            <Grid item md={12} xs={8}>
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={jobQuery.companyLogo}
                                                ></img>
                                            </Grid>
                                            <Grid item md={12} xs={8}>
                                                <Typography
                                                    variant="subtitle1"
                                                    mb={2}
                                                    gutterBottom={false}
                                                >
                                                    {jobQuery.companyName}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={12} xs={8}>
                                                <Divider />
                                            </Grid>
                                        </Grid>
                                        <JobQueryShortlistWorkerForm
                                            worker={worker}
                                            onChange={onWorkerChange}
                                            onSubmit={onShortlistWorker}
                                        />
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
