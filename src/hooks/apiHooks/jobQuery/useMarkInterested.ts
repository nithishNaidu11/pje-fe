import { useMutation } from '@tanstack/react-query';
import { markInterest } from 'api/jobQuery';
import { ApiError } from 'interfaces';

type Params = {
    companyId: string;
    chekInterestCode: string;
    interestStatus: 'INTERESTED' | 'NOT_INTERESTED';
};

export const useMarkInterested = () => {
    return useMutation<unknown, ApiError, Params>(
        ({ companyId, chekInterestCode, interestStatus }: Params) => {
            return markInterest
                .post({
                    params: { chekInterestCode, companyId },
                    body: {
                        status: interestStatus
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
