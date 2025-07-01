import { ApiClient } from 'middleware';

export const companyDetails = ApiClient({
    url: `/v1/company/abc-onboarding/details`
});

export const formFields = ApiClient({
    url: `/v1/form-fields`
});
