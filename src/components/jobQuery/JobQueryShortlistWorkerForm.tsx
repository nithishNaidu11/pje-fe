import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import HiringLg from 'hiring_lg.png';
import HiringSm from 'hiring_sm.png';

import type { ShortlistWorkerProps, Worker } from 'interfaces';
import { useIsMobile, useShortlistedWorkers } from 'hooks';
import { JobQueryCompanyDetails } from './JobQueryCompanyDetails';
import { RegExUtil } from 'utils';

interface JobQueryShortlistWorkerFormProps {
    companyId: string;
    jobQueryId: string;
    jobTitle: string;
    setIsWorkerShortlisted: (_: boolean) => void;
    setShowLoader: (_: boolean) => void;
    companyName: string;
    companyLogo: string;
}

export const JobQueryShortlistWorkerForm = ({
    companyId,
    jobQueryId,
    jobTitle,
    setIsWorkerShortlisted,
    setShowLoader,
    companyName,
    companyLogo
}: JobQueryShortlistWorkerFormProps) => {
    const navigate = useNavigate();
    const shortlistWorkers = useShortlistedWorkers();
    const isMobile = useIsMobile();

    const [worker, setWorker] = React.useState({
        fullName: '',
        mobileNumber: ''
    });
    const [error, setError] = React.useState('');

    const onChange = (modifiedWorker: Partial<ShortlistWorkerProps>) => {
        setWorker(worker => {
            return {
                ...worker,
                ...modifiedWorker
            };
        });
    };

    const onShortlistWorker = () => {
        setError('');
        shortlistWorkers.mutate(
            {
                companyId,
                jobQueryId,
                workers: [worker]
            },
            {
                onSuccess: (data: { workers: Worker[] }) => {
                    setShowLoader(false);
                    if (data.workers.length) {
                        setIsWorkerShortlisted(true);
                        navigate(`/${data.workers[0]?.shortcode}`);
                    } else {
                        setError('You are already shorlisted!');
                    }
                },
                onError: () => {
                    setShowLoader(false);
                }
            }
        );
    };
    return (
        <Grid container>
            {isMobile ? (
                <Grid
                    item
                    xs={12}
                    md={0}
                    style={{ backgroundColor: '#0F284E', height: '30vh' }}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={HiringSm}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%'
                        }}
                    />
                </Grid>
            ) : (
                <Grid
                    md={6}
                    item
                    style={{ backgroundColor: '#0F284E', height: '100vh' }}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={HiringLg}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%'
                        }}
                    />
                </Grid>
            )}
            <Grid
                xs={12}
                md={6}
                item
                sx={{
                    clear: 'both',
                    paddingX: { md: 12 },
                    paddingY: { xs: 4, md: 20 }
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={12} xs={8}>
                        <JobQueryCompanyDetails
                            companyName={companyName}
                            companyLogo={companyLogo}
                        />
                    </Grid>
                    <Grid item md={12} xs={10}>
                        <Typography
                            variant="h6"
                            mb={2}
                            textAlign="center"
                            display="flex"
                            justifyContent="center"
                        >
                            {jobTitle}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={10}
                        textAlign="center"
                        marginBottom={2}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Free Job Registration
                        </Typography>
                        <Typography>
                            Enter info view job details & apply
                        </Typography>
                    </Grid>
                    <Grid item md={12} xs={10}>
                        <TextField
                            required
                            fullWidth
                            label="Full name"
                            name="fullName"
                            value={worker.fullName || ''}
                            onChange={(e: React.BaseSyntheticEvent) => {
                                onChange({
                                    fullName: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={10}>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            label="Mobile Number"
                            name="mobileNumber"
                            value={worker.mobileNumber || ''}
                            onChange={e => {
                                onChange({
                                    mobileNumber: e.target.value
                                });
                            }}
                            sx={{
                                // hide increment decrement buttons
                                '& .MuiInputBase-input': {
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                                        {
                                            display: 'none'
                                        }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={10}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onShortlistWorker}
                            disabled={
                                !RegExUtil.isName(worker.fullName) ||
                                !RegExUtil.isMobileNumber(worker.mobileNumber)
                            }
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={10}>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
