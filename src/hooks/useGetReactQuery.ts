import { useQuery } from '@tanstack/react-query';

import { ApiError, FormFields } from 'interfaces';
import ErrorTracker from 'utils/ErrorTracker';

type SuccessData = FormFields | any;

interface GetReactQueryProps {
    queryKey: any;
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    enabled?: boolean;
    onSuccess?: (data: SuccessData) => void;
    onError?: (error: ApiError) => void;
}
export const useGetReactQuery = ({
    queryKey,
    requestUrl,
    params,
    enabled = true,
    onSuccess,
    onError
}: GetReactQueryProps) => {
    return useQuery<SuccessData, ApiError>({
        queryKey,
        queryFn: () => {
            return requestUrl
                .get({
                    params
                })
                .then((response: Response) => {
                    return response;
                });
        },
        refetchOnWindowFocus: false,
        enabled,
        onSuccess,
        onError: (response: ApiError) => {
            onError?.(response);
            ErrorTracker.captureException(response);
        }
    });
};
