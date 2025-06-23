import { ApiClient } from 'middleware';

export const get = ApiClient({
    url: '/v1/company/{companyId}/get-pre-joining-leads/'
});

export const bulkUpload = ApiClient({
    url: '/v1/company/{companyId}/upload-pre-joining-leads-bulk/'
});

export const columnStructure = ApiClient({
    url: 'v1/company/{companyId}/get-column-structure/'
});
