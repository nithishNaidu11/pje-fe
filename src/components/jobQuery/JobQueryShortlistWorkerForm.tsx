import React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ShortlistWorkerProps, Worker } from 'interfaces';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useShortlistedWorkers } from 'hooks';
import { JobQueryCompanyDetails } from './JobQueryCompanyDetails';

interface JobQueryShortlistWorkerFormProps {
    companyId: string;
    jobQueryId: string;
    setIsWorkerShortlisted: (_: boolean) => void;
    setShowLoader: (_: boolean) => void;
    companyName: string;
    companyLogo: string;
}

export const JobQueryShortlistWorkerForm = ({
    companyId,
    jobQueryId,
    setIsWorkerShortlisted,
    setShowLoader,
    companyName,
    companyLogo
}: JobQueryShortlistWorkerFormProps) => {
    const navigate = useNavigate();
    const shortlistWorkers = useShortlistedWorkers();

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
        <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={8}>
                <JobQueryCompanyDetails
                    companyName={companyName}
                    companyLogo={companyLogo}
                />
            </Grid>
            <Grid item md={12} xs={8}>
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
            <Grid item md={12} xs={8}>
                <TextField
                    required
                    fullWidth
                    label="Mobile Number"
                    name="mobileNumber"
                    value={worker.mobileNumber || ''}
                    onChange={e => {
                        onChange({
                            mobileNumber: e.target.value
                        });
                    }}
                />
            </Grid>
            <Grid item md={12} xs={8}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onShortlistWorker}
                    disabled={!worker.fullName || !worker.mobileNumber}
                >
                    SUBMIT
                </Button>
            </Grid>
            <Grid item md={12} xs={8}>
                {error && <Alert severity="error">{error}</Alert>}
            </Grid>
        </Grid>
    );
};
