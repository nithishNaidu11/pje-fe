import React from 'react';

import { Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const RESEND_OTP_DURATION = 60;

interface ResendOtpTimerProps {
    resendOtp: () => void;
}

export const ResendOtpTimer = ({ resendOtp }: ResendOtpTimerProps) => {
    const [counter, setCounter] = React.useState(RESEND_OTP_DURATION);

    React.useEffect(() => {
        if (!counter) return;

        const intervalId = setInterval(() => {
            setCounter(counter - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [counter]);

    const onResendOtp = () => {
        resendOtp();
        setCounter(RESEND_OTP_DURATION);
    };

    if (!counter) {
        return (
            <Button
                variant="text"
                size="small"
                color="error"
                onClick={onResendOtp}
                sx={{ ml: -0.5 }}
            >
                {'Resend OTP'}
            </Button>
        );
    }

    return (
        <Typography color={grey[600]} py={0.5}>
            {`Resend OTP in ${counter} seconds`}
        </Typography>
    );
};
