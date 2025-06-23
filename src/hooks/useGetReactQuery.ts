import { useQuery } from '@tanstack/react-query';

import { ApiError } from 'interfaces';
import ErrorTracker from 'utils/ErrorTracker';

interface GetReactQueryProps<TSuccessData> {
    queryKey: string[];
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    enabled?: boolean;
    onSuccess?: (data: TSuccessData) => void;
    onError?: (error: ApiError) => void;
}
export const useGetReactQuery = <TSuccessData>({
    queryKey,
    requestUrl,
    params,
    enabled = true,
    onSuccess,
    onError
}: GetReactQueryProps<TSuccessData>) => {
    return useQuery<TSuccessData, ApiError>({
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
