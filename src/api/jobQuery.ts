import { ApiClient } from 'middleware';

export const create = ApiClient({
    url: `/v1/company/{companyId}/job-query`
});

export const search = ApiClient({
    url: `/v1/company/{companyId}/search-job-query`
});

export const jobQuery = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}`
});

export const shortlist = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/workers`
});

export const searchShortlist = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/shortlisted-workers`
});

export const checkInterest = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/check-interest`
});

export const removeShortlist = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/workers-remove`
});

export const status = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/mark`
});

export const share = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/share`
});

export const hire = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/mark-worker`
});

export const dynamicQRCode = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/qr-code`
});

export const shareWorker = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/shared-workers`
});

export const fetch = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/fetch`
});
export const searchInterested = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/interested-workers`
});

export const bulkUpload = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/bulk-shortlist-worker`
});

export const openJobQuery = ApiClient({
    url: `/v1/job-query/{jobQueryId}/details`
});

export const markInterest = ApiClient({
    url: `v1/company/{companyId}/job-query/{chekInterestCode}/mark-interest`
});
