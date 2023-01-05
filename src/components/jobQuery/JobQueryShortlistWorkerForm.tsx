import React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ShortlistWorkerProps } from 'interfaces';

interface JobQueryShortlistWorkerFormProps {
    worker: ShortlistWorkerProps;
    onChange: (_: Partial<ShortlistWorkerProps>) => void;
    onSubmit: VoidFunction;
}

export const JobQueryShortlistWorkerForm = ({
    worker,
    onChange,
    onSubmit
}: JobQueryShortlistWorkerFormProps) => {
    return (
        <Grid container spacing={2} justifyContent="center">
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
                    onClick={onSubmit}
                    disabled={!worker.fullName || !worker.mobileNumber}
                >
                    SUBMIT
                </Button>
            </Grid>
        </Grid>
    );
};
