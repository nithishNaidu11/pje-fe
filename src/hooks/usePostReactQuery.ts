import { type QueryKey, useQuery } from '@tanstack/react-query';

import type { ApiError } from 'interfaces';
import { ErrorTracker } from 'utils';

interface PostReactQueryProps<TSuccessData> {
    queryKey: QueryKey;
    requestUrl: any;
    body: Record<string, unknown>;
    params?: Record<string, string | null | undefined>;
    enabled?: boolean;
    exclude?: string;
    onSuccess?: (data: TSuccessData) => void;
    onError?: (error: ApiError) => void;
}

export const usePostReactQuery = <TSuccessData>({
    queryKey,
    requestUrl,
    body,
    params = {},
    enabled = true,
    exclude = '',
    onSuccess,
    onError
}: PostReactQueryProps<TSuccessData>) => {
    return useQuery<TSuccessData, ApiError>({
        queryKey,
        queryFn: () => {
            return requestUrl
                .post({ params, body, exclude })
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
