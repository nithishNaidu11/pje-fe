import { useMutation } from '@tanstack/react-query';

import { validateOTP } from 'api/quiz';

import { ApiError, ValidateQuizOtpResponseProps } from 'interfaces';

interface ValidateQuizOtpProps {
    body: {
        mobileNumber: string;
        otpToken: string;
    };
}

export const useValidateQuizOtp = () => {
    return useMutation<
        ValidateQuizOtpResponseProps,
        ApiError,
        ValidateQuizOtpProps
    >(({ body: { mobileNumber, otpToken } }: ValidateQuizOtpProps) => {
        return validateOTP
            .post({ body: { mobileNumber, otpToken } })
            .then((response: ValidateQuizOtpResponseProps) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
