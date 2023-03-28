import { useMutation } from '@tanstack/react-query';
import { submitAnswers } from 'api/jobQuery';
import { ApiError } from 'interfaces';

type Params = {
    companyId: string;
    jobQueryId: string;
    shortcode: string;
    profileUpdateAnswers: Record<string, string>;
    qualificationAnswers: Record<string, string>;
};

export const useSubmitAnswers = () => {
    return useMutation<unknown, ApiError, Params>(
        ({
            companyId,
            jobQueryId,
            shortcode,
            profileUpdateAnswers,
            qualificationAnswers
        }: Params) => {
            return submitAnswers
                .post({
                    params: { jobQueryId, companyId },
                    body: {
                        shortcode,
                        profileUpdateAnswers,
                        qualificationAnswers
                    },
                    exclude: 'profile_update_answers'
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
