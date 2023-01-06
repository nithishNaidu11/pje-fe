import { useMutation } from '@tanstack/react-query';
import { markInterest } from 'api/jobQuery';
import { JOB_QUERY_MARK_STATUS } from 'Enum';
import { ApiError } from 'interfaces';

type Params = {
    companyId: string;
    shortcode: string;
    interestStatus: JOB_QUERY_MARK_STATUS;
};

export const useMarkInterested = () => {
    return useMutation<unknown, ApiError, Params>(
        ({ companyId, shortcode, interestStatus }: Params) => {
            return markInterest
                .post({
                    params: { shortcode, companyId },
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
