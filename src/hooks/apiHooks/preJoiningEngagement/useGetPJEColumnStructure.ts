import { columnStructure } from 'api/preJoiningEngagement';
import { usePostReactQuery } from 'hooks/usePostReactQuery';

interface GetPJELeadsProps {
    companyId: string;
}

export const useGetPJEColumnStructure = ({ companyId }: GetPJELeadsProps) => {
    return usePostReactQuery({
        queryKey: ['useGetPJEColumnStructure', companyId],
        requestUrl: columnStructure,
        params: { companyId },
        body: {}
    });
};
