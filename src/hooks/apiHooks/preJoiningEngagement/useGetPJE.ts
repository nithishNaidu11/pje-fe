import { get } from 'api/preJoiningEngagement';
import { usePostReactQuery } from 'hooks/usePostReactQuery';

interface GetPJELeadsProps {
    companyId: string;
    body: {
        page: number;
        itemsPerPage: number;
    };
    enabled?: boolean;
}

export const useGetPJE = ({
    companyId,
    body,
    enabled = true
}: GetPJELeadsProps) => {
    const { page, itemsPerPage } = body;
    return usePostReactQuery({
        queryKey: ['useGetPJE', companyId, page, itemsPerPage],
        requestUrl: get,
        params: { companyId },
        body: {
            ...body
        },
        enabled: enabled
    });
};
