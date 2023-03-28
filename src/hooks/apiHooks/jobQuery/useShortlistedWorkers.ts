import { useMutation } from '@tanstack/react-query';
import { shortlistWorkers } from 'api/jobQuery';
import { type ApiError, ShortlistWorkerProps, Worker } from 'interfaces';

type Params = {
    companyId: string;
    jobQueryId: string;
    workers: ShortlistWorkerProps[];
};

type Response = {
    workers: Worker[];
};

export const useShortlistedWorkers = () => {
    return useMutation<Response, ApiError, Params>(
        ({ companyId, jobQueryId, workers }: Params) => {
            return shortlistWorkers
                .post({
                    params: { jobQueryId, companyId },
                    body: {
                        workers
                    }
                })
                .then((response: Response): Response => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
