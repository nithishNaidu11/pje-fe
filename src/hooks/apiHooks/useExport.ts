import { useMutation } from '@tanstack/react-query';

import { ApiError } from 'interfaces';
import { DataUtils } from 'utils';

interface Params {
    [key: string]: string | undefined;
}

type Props = {
    apiClient: any; // TODO: type this(ApiClient)
    params: Params;
    body?: {
        // actionSource?: JQ_ACTION_SOURCE;
        // candidateIds?: string[];
    };
};

export const useExport = ({ apiClient, params, body = {} }: Props) => {
    return useMutation<Blob, ApiError, string[]>(fields => {
        const requestBody = {
            responseType: 'text/xlsx',
            exportFields: fields.map(field => DataUtils.toSnakeWrapper(field)),
            ...body
        };
        return apiClient
            .post({
                params: { ...params },
                body: requestBody,
                responseType: 'blob'
            })
            .then(async (response: { data: Blob }) => {
                return response.data;
            })
            .catch((error: ApiError): ApiError => {
                throw error;
            });
    });
};
