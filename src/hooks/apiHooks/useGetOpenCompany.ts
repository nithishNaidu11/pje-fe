import { companyDetails } from '../../api/company';

import { useGetReactQuery } from 'hooks/useGetReactQuery';

import type { CompanyProps } from 'interfaces';

interface GetOpenCompanyProps {
    params: { companyId?: string };
    enabled?: boolean;
}

export const useGetOpenCompany = ({
    params: { companyId = '' },
    enabled = false
}: GetOpenCompanyProps) => {
    return useGetReactQuery({
        queryKey: ['companyDetails', companyId],
        params: { companyId },
        requestUrl: companyDetails,
        onSuccess: (data: CompanyProps) => data,
        enabled
    });
};
