import { UseQueryResult } from '@tanstack/react-query';
import { columnStructure } from 'api/preJoiningEngagement';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { ApiError } from 'interfaces';

export const useGetPJEColumnStructure = (): UseQueryResult<
    Response,
    ApiError
> => {
    return usePostReactQuery({
        queryKey: ['useGetPJEColumnStructure'],
        requestUrl: columnStructure,
        body: {}
    });
};
