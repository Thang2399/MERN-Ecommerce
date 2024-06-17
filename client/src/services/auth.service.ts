import { defaultLoginFormTypes } from '../types/login';
import { signUpFormPayloadTypes } from '../types/signup';
import baseRequest from './service';
import { IResetPasswordFormPayload } from '../types/resetPassword';

const authEndpoint = '/auth';

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await baseRequest.post(`${authEndpoint}/login`,  payload );
    return response;
};

const signUpUser = async (payload: signUpFormPayloadTypes) => {
    const response = await baseRequest.post(`${authEndpoint}/sign-up`, payload);
    return response;
};

const forgetPassword = async (payload: {email: string}) => {
    const response = await baseRequest.post(`${authEndpoint}/forgot-password`, payload);
    return response;
};

const checkTokenInUsed = async (payload: {token: string}) => {
    const response = await baseRequest.post(`${authEndpoint}/check-token-in-used`, payload);
    return response;
};

const resetPassword = async (payload: IResetPasswordFormPayload) => {
    const response = await baseRequest.post(`${authEndpoint}/reset-password`, payload);
    return response;
};

const getUserInfor = async () => {
    const response = await baseRequest.post(`${authEndpoint}/me`);
    return response;
};

const authService = {
    loginUser,
    signUpUser,
    forgetPassword,
    checkTokenInUsed,
    resetPassword,
    getUserInfor
};
export default authService;
