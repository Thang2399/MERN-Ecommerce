import axios, { AxiosResponse } from 'axios';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../constants';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const axiosBase = axios.create({
    baseURL: endpoint,
    timeout: 86400,
    transformRequest: [ (data, headers) => {
        const convertedData = JSON.stringify(data);
        return convertedData;
    }, ]
});

const token = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN) || '';

// default headers
axiosBase.defaults.headers['Authorization'] = token;
axiosBase.defaults.headers['Accept'] = 'application/json, text/plain, */*';
axiosBase.defaults.headers['Content-Type'] = 'application/json';

// request interceptors
axiosBase.interceptors.request.use(
    (config: any) => {
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
    (err: any) => {
        console.log('Something went wrong with response', err);
        return Promise.reject(err);
    }
);

export default axiosBase;