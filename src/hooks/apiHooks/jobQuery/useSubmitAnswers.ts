import { useMutation } from '@tanstack/react-query';
import { submitAnswers } from 'api/jobQuery';
import { ApiError } from 'interfaces';

type Params = {
    companyId: string;
    jobQueryId: string;
    shortcode: string;
    answers: any;
};

export const useSubmitAnswers = () => {
    return useMutation<unknown, ApiError, Params>(
        ({ companyId, jobQueryId, shortcode, answers }: Params) => {
            return submitAnswers
                .post({
                    params: { jobQueryId, companyId },
                    body: {
                        shortcode,
                        answers
                    }
                })
                .then((response: unknown) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
