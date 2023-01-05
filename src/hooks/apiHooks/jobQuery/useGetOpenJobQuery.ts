import { useQuery } from '@tanstack/react-query';
import { openJobQuery } from 'api/jobQuery';
import { SingleJobQuery } from 'interfaces';

interface Props {
    shortcode?: string;
    enabled: boolean;
}

export const useGetOpenJobQuery = ({ shortcode, enabled = true }: Props) => {
    return useQuery({
        queryKey: ['openJobQuery', shortcode],
        queryFn: () => {
            return openJobQuery
                .post({
                    params: {
                        shortcode
                    }
                })
                .then((response: any): { jobQuery: SingleJobQuery } => {
                    return response;
                });
        },
        enabled
    });
};
