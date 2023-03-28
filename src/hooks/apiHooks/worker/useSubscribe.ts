import { useMutation } from '@tanstack/react-query';
import { subscribe } from 'api/worker';
import { ApiError } from 'interfaces';

interface Props {
    event: string;
    playerId: string;
    shortcode: string;
}

export const useSubscribe = () => {
    return useMutation<unknown, ApiError, Props>(
        ({ event, playerId, shortcode }: Props) => {
            return subscribe
                .post({
                    params: { shortcode },
                    body: {
                        event,
                        playerId
                    }
                })
                .then((response: unknown) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
