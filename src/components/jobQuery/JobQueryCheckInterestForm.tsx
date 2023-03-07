import React from 'react';

import Paper from '@mui/material/Paper';

import { JobQueryCheckInterestFooter } from './JobQueryCheckInterestFooter';
import { JobQueryCompanyDetails } from './JobQueryCompanyDetails';
import { JobQueryDetails } from './JobQueryDetails';

import { JOB_QUERY_MARK_STATUS } from 'Enum';
import { useGetFormFields, useIsMobile, useMarkInterested } from 'hooks';
import Alert from '@mui/material/Alert';
import { ApiError } from 'interfaces';

interface JobQueryCheckInterestFormProps {
    jobQuery: any;
    setShowLoader: (_: boolean) => void;
    setShowSuccessMessage: (_: boolean) => void;
    setShowChat: (_: boolean) => void;
    shortcode: string;
}
export const JobQueryCheckInterestForm = ({
    jobQuery,
    setShowLoader,
    setShowSuccessMessage,
    setShowChat,
    shortcode
}: JobQueryCheckInterestFormProps) => {
    const formFields = useGetFormFields();
    const isMobile = useIsMobile();
    const markInterested = useMarkInterested();

    const [error, setError] = React.useState('');

    const onMarkInterestStatus = (interestStatus: JOB_QUERY_MARK_STATUS) => {
        setShowLoader(true);
        setError('');
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
                onError: (error: ApiError) => {
                    setShowLoader(false);
                    setError(error.errors.displayError);
                }
            }
        );
    };

    return (
        <Paper sx={{ p: 2 }} elevation={isMobile ? 0 : 2}>
            <JobQueryCompanyDetails
                companyName={jobQuery.companyName || 'Hunar'}
                companyLogo={
                    jobQuery.companyLogo ||
                    'https://storage.googleapis.com/public_bocket/hunar-logo512.png'
                }
            />
            {formFields?.data && (
                <JobQueryDetails
                    jobQuery={jobQuery}
                    formFields={formFields.data}
                />
            )}
            <JobQueryCheckInterestFooter
                onMarkInterestStatus={onMarkInterestStatus}
            />

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Paper>
    );
};
