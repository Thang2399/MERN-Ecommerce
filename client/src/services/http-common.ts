import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS, HTTP_STATUS } from '@/constants';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const axiosBase = axios.create({
    baseURL: endpoint,
    timeout: 86400,
    transformRequest: [ (data, headers) => {
        const convertedData = JSON.stringify(data);
        return convertedData;
    },
    ]
});

const token = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN) || '';

// default headers
axiosBase.defaults.headers['Authorization'] = token;
axiosBase.defaults.headers['Accept'] = 'application/json, text/plain, */*';
axiosBase.defaults.headers['Content-Type'] = 'application/json';

// request interceptors
axiosBase.interceptors.request.use(
    (config: any) => {
        const token = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);

        if (token) {
            // Attach the token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log('config', config);
        return config;
    },
    (err: any) => {
        console.log('Something went wrong with request', err);
        return Promise.reject(err);
    }
);

// response interceptors
axiosBase.interceptors.response.use(
    (res: AxiosResponse<any, any>) => {
        console.log('res', res);
        return res;
    },
    async (err: any) => {
        console.log('Something went wrong with response', err);
        if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
            const refreshToken = localStorage.getItem(COMMON_CONSTANTS.REFRESH_TOKEN);
            if (!refreshToken) {
                window.location.href = '/';
            } else {
                const payload = { token: refreshToken };
                try {
                    const res = await axios.post(`${endpoint}/auth/generate/new-token`, payload);
                    const data = res.data;
                    if (data.accessToken && data.refreshToken) {
                        setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, data.accessToken);
                        localStorage.setItem(COMMON_CONSTANTS.REFRESH_TOKEN, data.refreshToken);
                        window.location.href = window.location.pathname;
                    }
                } catch (err) {
                    localStorage.removeItem(COMMON_CONSTANTS.REFRESH_TOKEN);
                    setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, '');
                    window.location.href = '/';
                }
            }
        }
        return Promise.reject(err);
    }
);

export default axiosBase;


//http://localhost:4400/login?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzQyMDMwNzMzMzI1ZGVkOGY4MzJjNSIsImVtYWlsIjoidG9hbnRoYW5nMTk5OWhwQGdtYWlsLmNvbSIsImlhdCI6MTcxODg4NzE0NiwiZXhwIjoxNzE4OTczNTQ2fQ.6ntamkicYTdPQ85ZsgSq5XyXcZBuYO5tGL5ZYqEBr0A&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzQyMDMwNzMzMzI1ZGVkOGY4MzJjNSIsImVtYWlsIjoidG9hbnRoYW5nMTk5OWhwQGdtYWlsLmNvbSIsImlhdCI6MTcxODg4NzE0NiwiZXhwIjoxNzE5NDkxOTQ2fQ.liVExhz9Hn5EJMFFMMDPbhytwzSP4NBWDhp-pQpsPjI
