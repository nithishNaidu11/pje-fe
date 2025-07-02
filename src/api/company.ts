import { ApiClient } from 'middleware';

export const companyDetails = ApiClient({
    url: `/company/details`
});

export const formFields = ApiClient({
    url: `/v1/form-fields`
});
