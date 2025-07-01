import { useMutation } from '@tanstack/react-query';

import { requestOTP } from 'api/quiz';

import { ApiError, RequestQuizOtpResponseProps } from 'interfaces';

interface RequestQuizOtpProps {
    body: {
        mobileNumber: string;
    };
}

export const useRequestQuizOtp = () => {
    return useMutation<
        RequestQuizOtpResponseProps,
        ApiError,
        RequestQuizOtpProps
    >(({ body: { mobileNumber } }: RequestQuizOtpProps) => {
        return requestOTP
            .post({ body: { mobileNumber } })
            .then((response: RequestQuizOtpResponseProps) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
