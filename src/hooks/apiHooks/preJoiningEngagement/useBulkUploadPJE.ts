import { useMutation } from '@tanstack/react-query';

import { bulkUpload } from 'api/preJoiningEngagement';

import { ApiError } from 'interfaces';
import { PJEProps } from 'interfaces/preJoiningEngagement.interface';
import { AB_PAYROLL_TYPE } from 'Enum';

type Params = {
    companyId: string;
    candidateFile?: File;
    payrollType?: AB_PAYROLL_TYPE;
};

export const useBulkUploadPJE = () => {
    return useMutation<PJEProps[], ApiError, Params>(
        ({ companyId, candidateFile, payrollType }: Params) => {
            return bulkUpload
                .postForm({
                    params: { companyId },
                    body: {
                        candidateFile,
                        payrollType
                    }
                })
                .then((response: Worker[]): Worker[] => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
