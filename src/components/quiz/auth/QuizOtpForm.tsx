import React from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { MuiOtpInput } from 'mui-one-time-password-input';

import { Alert, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomButton } from '@hunar.ai/hunar-design-system';

import { QuizLayout, QuizFooterLogo, ResendOtpTimer } from 'components/quiz';
import { otpInputSx } from '../QuizStyles';

import { useErrorHelper } from 'hooks/useErrorHelper';
import { useRequestQuizOtp } from 'hooks/apiHooks/quiz/useRequestQuizOtp';
import { useValidateQuizOtp } from 'hooks/apiHooks/quiz/useValidateQuizOtp';

import { ValidateQuizOtpResponseProps } from 'interfaces';
import { QUIZ_STATUS } from 'Enum';

const OTP_LENGTH = 6;

export const QuizOtpForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [searchParams] = useSearchParams();
    const { getApiErrorMsg } = useErrorHelper();

    const [otp, setOtp] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const requestOtp = useRequestQuizOtp();
    const validateOtp = useValidateQuizOtp();

    const mobileNumber = searchParams.get('mobile') || '';

    if (!mobileNumber) {
        return <Navigate to="/abc/auth/login" />;
    }

    const navigateToWelcomeScreen = (
        preJoiningLeadId: string,
        fullName: string,
        quizId: string | null
    ) => {
        const searchParams = new URLSearchParams();
        searchParams.set('fullname', fullName);

        if (quizId) {
            searchParams.set('quizId', quizId);
        }

        navigate({
            pathname: `/abc/welcome/${preJoiningLeadId}`,
            search: searchParams.toString()
        });
    };

    const navigateToQuizPassedScreen = (quizId: string) => {
        navigate({
            pathname: `/abc/quiz/${quizId}/result`
        });
    };

    const onValidateOtpSuccess = (
        preJoiningLeadId: string,
        fullName: string,
        quizId: string | null,
        quizStatus: QUIZ_STATUS | null
    ) => {
        if (quizStatus === null || QUIZ_STATUS.FAILED) {
            navigateToWelcomeScreen(preJoiningLeadId, fullName, null);
        } else if (quizId && quizStatus === QUIZ_STATUS.PASSED) {
            navigateToQuizPassedScreen(quizId);
        } else {
            navigateToWelcomeScreen(preJoiningLeadId, fullName, quizId);
        }
    };

    const validateSubmittedOtp = () => {
        validateOtp
            .mutateAsync({
                body: { mobileNumber: mobileNumber, otpToken: otp }
            })
            .then((response: ValidateQuizOtpResponseProps) => {
                if (
                    response?.quizId &&
                    response.quizStatus === QUIZ_STATUS.PASSED
                ) {
                    navigateToQuizPassedScreen(response?.quizId);
                    return;
                }

                onValidateOtpSuccess(
                    response?.preJoiningLeadId,
                    response?.fullName,
                    response?.quizId,
                    response?.quizStatus
                );
            })
            .catch(error => setErrorMsg(getApiErrorMsg(error)));
    };

    const onSubmitOtp = () => {
        validateSubmittedOtp();
    };

    const onResendOtp = () => {
        requestOtp
            .mutateAsync({
                body: { mobileNumber }
            })
            .catch(error => setErrorMsg(getApiErrorMsg(error)));
    };

    return (
        <QuizLayout>
            <Box py={isMobile ? 4 : 8} px={isMobile ? 3 : 8}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                    color={grey[900]}
                    textAlign="center"
                    mb={3}
                >
                    Enter OTP
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={400}
                    color={grey[900]}
                    textAlign="center"
                    mb={3}
                >
                    We’ve sent the OTP to {mobileNumber}
                </Typography>
                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}

                <MuiOtpInput
                    TextFieldsProps={{
                        sx: otpInputSx,
                        type: 'number'
                    }}
                    value={otp}
                    onChange={value => setOtp(value)}
                    length={OTP_LENGTH}
                    display="flex"
                    gap={0.75}
                    mb={2}
                />
                <CustomButton
                    isFullWidth
                    onClick={onSubmitOtp}
                    primaryColor={theme.palette.quiz.button.primary}
                    isLoading={validateOtp.isLoading}
                    isDisabled={otp.length !== OTP_LENGTH}
                    sx={{ fontWeight: 700 }}
                    size="large"
                >
                    {'PROCEED'}
                </CustomButton>
                <ResendOtpTimer resendOtp={onResendOtp} />

                <QuizFooterLogo />
            </Box>
        </QuizLayout>
    );
};
