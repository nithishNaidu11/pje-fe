import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DataUtils, ErrorTracker } from 'utils';

interface UpdatedAxiosRequestConfig extends AxiosRequestConfig {
    exclude?: string;
}

Axios.interceptors.request.use(
    (config: UpdatedAxiosRequestConfig) => {
        // const authHeaders = localStorage.token
        //     ? { Authorization: `Token ${JSON.parse(localStorage.token)}` }
        //     : {};
        return {
            baseURL: window.RUNTIME_CONFIG?.API_ENDPOINT,
            ...config,
            headers: {
                // ...authHeaders,
                ...config.headers
            },
            data:
                config.headers?.['Content-Type'] === 'multipart/form-data'
                    ? config.data
                    : DataUtils.snakizeWithSeparator(config.data)
        };
    },
    error => {
        ErrorTracker.captureException(error);
        return Promise.reject(DataUtils.camelize(error));
    }
);

Axios.interceptors.response.use(
    (response: AxiosResponse) => {
        const updatedConfig = response.config as UpdatedAxiosRequestConfig;

        if (response.headers['content-type'] === 'application/json') {
            return DataUtils.camelize(response.data, updatedConfig?.exclude);
        }

        return response;
    },
    error => {
        ErrorTracker.captureException(error);
        // if (error.response.status === 401) {
        //     localStorage.removeItem('token');
        //     window.location.reload();
        // }
        if (error.response.data.errors) {
            return Promise.reject(DataUtils.camelize(error.response.data));
        } else {
            return Promise.reject(
                DataUtils.camelize({
                    errors: {
                        api: error.config.baseURL + error.config.url,
                        displayError: error.message
                    }
                })
            );
        }
    }
);
