import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Alert,
    Box,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomButton } from '@hunar.ai/hunar-design-system';

import { QuizLayout, QuizFooterLogo } from 'components/quiz';
import { HelperText } from 'components/common';

import { useValidationHelper } from 'hooks/useValidationHelper';
import { useErrorHelper } from 'hooks/useErrorHelper';
import { useRequestQuizOtp } from 'hooks/apiHooks/quiz/useRequestQuizOtp';

import { ValidationMapProps } from 'interfaces';
import { ErrorMsg, RegExUtil } from 'utils';

interface LoginFormProps {
    fullName: string;
    mobileNumber: string;
}

const loginFormErrorStateInitialValues: Record<keyof LoginFormProps, boolean> =
    {
        fullName: false,
        mobileNumber: false
    };

const requiredFields: (keyof LoginFormProps)[] = ['fullName', 'mobileNumber'];
const validationMap: ValidationMapProps = {
    fullName: (fullName: string) => RegExUtil.isName(fullName),
    mobileNumber: (mobileNumber: string) =>
        RegExUtil.isMobileNumber(mobileNumber)
};

export const QuizLogin = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { getApiErrorMsg } = useErrorHelper();
    const { getFormErrorData, hasFormFieldError } =
        useValidationHelper(validationMap);

    const [loginForm, setLoginForm] = React.useState<LoginFormProps>({
        fullName: '',
        mobileNumber: ''
    });
    const [loginFormErrorState, setLoginFormErrorState] = React.useState(
        loginFormErrorStateInitialValues
    );
    const [errorMsg, setErrorMsg] = React.useState('');

    const isSendOtpDisabled = React.useMemo(
        () => !loginForm.fullName || !loginForm.mobileNumber,
        [loginForm.fullName, loginForm.mobileNumber]
    );

    const requestOtp = useRequestQuizOtp();

    const onFormFieldChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = name as keyof LoginFormProps;
        setLoginForm(prevForm => {
            return {
                ...prevForm,
                [fieldName]: value
            };
        });
    };

    const onFormFieldBlur = ({
        target: { name, value }
    }: React.FocusEvent<HTMLInputElement, Element>) => {
        setLoginFormErrorState(prevErrorState => ({
            ...prevErrorState,
            [name]: hasFormFieldError({
                fieldName: name,
                fieldValue: value,
                isRequired: true
            })
        }));
    };

    const generateOtp = () => {
        requestOtp
            .mutateAsync({
                body: { mobileNumber: loginForm.mobileNumber }
            })
            .then(() => {
                const searchParams = new URLSearchParams();
                searchParams.set('mobile', loginForm.mobileNumber);

                navigate({
                    pathname: '/abc/auth/otp/',
                    search: searchParams.toString()
                });
            })
            .catch(error => setErrorMsg(getApiErrorMsg(error)));
    };

    const onFormSubmit = () => {
        const { errorState: modifiedErrorState, hasFormError } =
            getFormErrorData({ form: loginForm, requiredFields });

        setLoginFormErrorState(prevErrorState => ({
            ...prevErrorState,
            ...modifiedErrorState
        }));

        if (hasFormError) {
            return;
        }

        setErrorMsg('');
        generateOtp();
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
                    Welcome to the Pre-Induction Assessment
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight={400}
                    color={grey[900]}
                    textAlign="center"
                    mb={isMobile ? 3 : 5}
                >
                    Enter details to sign up and get started.
                </Typography>

                <TextField
                    required
                    fullWidth
                    label="Full name"
                    name="fullName"
                    id="fullName"
                    value={loginForm.fullName}
                    onChange={onFormFieldChange}
                    onBlur={onFormFieldBlur}
                    error={loginFormErrorState.fullName}
                    helperText={
                        <HelperText
                            hasError={loginFormErrorState.fullName}
                            errorMsg={ErrorMsg.required()}
                        />
                    }
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="Mobile Number"
                    name="mobileNumber"
                    id="mobileNumber"
                    value={loginForm.mobileNumber}
                    onChange={onFormFieldChange}
                    onBlur={onFormFieldBlur}
                    error={loginFormErrorState.mobileNumber}
                    helperText={
                        <HelperText
                            hasError={loginFormErrorState.mobileNumber}
                            errorMsg={ErrorMsg.required()}
                        />
                    }
                    sx={{ mb: 2 }}
                />

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}
                <CustomButton
                    isFullWidth
                    onClick={onFormSubmit}
                    primaryColor={
                        theme.palette.quiz.button[
                            isSendOtpDisabled ? 'disabled' : 'primary'
                        ]
                    }
                    isLoading={requestOtp.isLoading}
                    isDisabled={isSendOtpDisabled}
                    sx={{ fontWeight: 700 }}
                    size="large"
                >
                    {'SEND OTP'}
                </CustomButton>

                <QuizFooterLogo />
            </Box>
        </QuizLayout>
    );
};
