import { loggedInPersonnel } from 'api/personnel';
import { useGetReactQuery } from 'hooks/useGetReactQuery';
import type { ApiError, PersonnelProps, QueryResult } from 'interfaces';

type Response = PersonnelProps;

export const useGetLoggedInPersonnel = ({
    enabled
}: {
    enabled: boolean;
}): QueryResult<Response, ApiError> => {
    return useGetReactQuery({
        queryKey: ['getLoggedInPersonnel'],
        requestUrl: loggedInPersonnel,
        enabled
    });
};
