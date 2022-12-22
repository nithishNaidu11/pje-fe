import React from 'react';
import { useParams } from 'react-router-dom';

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
    useIsMobile
} from 'hooks';

import SuccessIcon from './Success.png';

export const JobQueryCheckInterestContainer = () => {
    const formFields = useGetFormFields();

    const isMobile = useIsMobile();
    const { applyCode } = useParams();

    const { data: jobQuery } = useGetOpenJobQuery({
        jobQueryId: applyCode,
        enabled: !!applyCode
    });

    const markInterested = useMarkInterested();

    const [open, setOpen] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const onMarkInterestStatus = (
        interestStatus: 'INTERESTED' | 'NOT_INTERESTED'
    ) => {
        if (applyCode) {
            setOpen(true);
            markInterested.mutate(
                {
                    companyId: jobQuery.companyId,
                    chekInterestCode: applyCode,
                    interestStatus
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
                                    <PushNotification />
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Paper
                                    sx={{ p: 2 }}
                                    elevation={isMobile ? 0 : 2}
                                >
                                    <Typography variant="h5" mb={2}>
                                        {jobQuery.title}
                                    </Typography>
                                    <Typography component="p" variant="body2">
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
                                                    <Grid item md={6} xs={12}>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                onMarkInterestStatus(
                                                                    'NOT_INTERESTED'
                                                                )
                                                            }
                                                            fullWidth
                                                        >
                                                            NO, NOT INTERESTED
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
                                                            NO, NOT INTERESTED
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
                            </>
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
