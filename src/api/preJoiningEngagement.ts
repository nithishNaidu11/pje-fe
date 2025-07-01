import { ApiClient } from 'middleware';

export const get = ApiClient({
    url: '/v1/company/get-pre-joining-leads/'
});

export const bulkUpload = ApiClient({
    url: '/v1/company/upload-pre-joining-leads-bulk/'
});

export const columnStructure = ApiClient({
    url: 'v1/company/get-column-structure/'
});
