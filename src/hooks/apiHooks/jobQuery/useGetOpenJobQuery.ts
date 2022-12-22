import { useQuery } from '@tanstack/react-query';
import { openJobQuery } from 'api/jobQuery';
import { SingleJobQuery } from 'interfaces';

interface Props {
    jobQueryId?: string;
    enabled: boolean;
}

export const useGetOpenJobQuery = ({ jobQueryId, enabled = true }: Props) => {
    return useQuery({
        queryKey: ['openJobQuery', jobQueryId],
        queryFn: () => {
            return openJobQuery
                .post({
                    params: {
                        jobQueryId
                    }
                })
                .then((response: any): { jobQuery: SingleJobQuery } => {
                    return response;
                });
        },
        enabled
    });
};
