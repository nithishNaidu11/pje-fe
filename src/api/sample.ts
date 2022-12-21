import { ApiClient } from 'middleware';

export const create = ApiClient({
    url: `/v1/company/{companyId}/sample/{customerId}`
});
