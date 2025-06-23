import { useMutation } from '@tanstack/react-query';
import { PERSONNEL_ROLE } from 'Enum';

import { refresh } from 'api/signin';
import { ApiError } from 'interfaces';

export const useGetAccessToken = () => {
    return useMutation<any, ApiError, { userType?: PERSONNEL_ROLE }>(
        ({ userType }: { userType?: PERSONNEL_ROLE }) => {
            return refresh
                .post({
                    body: {
                        userType
                    }
                })
                .then((response: any) => {
                    return response;
                })
                .catch((error: ApiError): ApiError => {
                    throw error;
                });
        }
    );
};
