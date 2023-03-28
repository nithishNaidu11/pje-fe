import { ApiClient } from 'middleware';

export const subscribe = ApiClient({
    url: `/v1/worker/{shortcode}/update-device`
});
