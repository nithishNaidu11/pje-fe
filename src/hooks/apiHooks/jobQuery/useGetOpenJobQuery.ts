import { useQuery } from '@tanstack/react-query';
import { openJobQuery } from 'api/jobQuery';
import { SingleJobQueryResponse } from 'interfaces';

interface Props {
    shortcode?: string;
    enabled: boolean;
}

export const useGetOpenJobQuery = ({ shortcode, enabled = true }: Props) => {
    return useQuery<SingleJobQueryResponse>({
        queryKey: ['openJobQuery', shortcode],
        queryFn: () => {
            return openJobQuery
                .post({
                    params: {
                        shortcode
                    }
                })
                .then((response: any) => {
                    return response;
                });
        },
        refetchOnWindowFocus: false,
        enabled
    });
};
