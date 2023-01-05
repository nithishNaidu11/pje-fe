import { useMutation } from '@tanstack/react-query';
import { shortlistWorkers } from 'api/jobQuery';
import { ApiError } from 'interfaces';

type Params = {
    companyId: string;
    jobQueryId: string;

    workers: any;
};

export const useShortlistedWorkers = () => {
    return useMutation<unknown, ApiError, Params>(
        ({ companyId, jobQueryId, workers }: Params) => {
            return shortlistWorkers
                .post({
                    params: { jobQueryId, companyId },
                    body: {
                        workers
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
