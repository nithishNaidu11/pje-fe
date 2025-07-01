import { ApiClient } from 'middleware';

export const loggedInPersonnel = ApiClient({
    url: `/v1/me`
});
