import { ApiClient } from 'middleware/ApiClient';

export const formFields = ApiClient({
    url: `/v1/form-fields`
});

export const company = ApiClient({
    url: `/v1/company/{companyId}`
});

export const inputFields = ApiClient({
    url: `/v1/input-fields`
});

export const companyDetails = ApiClient({
    url: `/v1/company/{companyId}/details`
});
