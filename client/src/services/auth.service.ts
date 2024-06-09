import { defaultLoginFormTypes } from '../types/login';
import { signUpFormPayloadTypes } from '../types/signup';
import authRequest from './service';
import { IResetPasswordFormPayload } from '../types/resetPassword';

const authEndpoint = '/auth';

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await authRequest.post(`${authEndpoint}/login`,  payload );
    return response;
};

const signUpUser = async (payload: signUpFormPayloadTypes) => {
    const response = await authRequest.post(`${authEndpoint}/sign-up`, payload);
    return response;
};

const forgetPassword = async (payload: {email: string}) => {
    const response = await authRequest.post(`${authEndpoint}/forgot-password`, payload);
    return response;
};

const checkTokenInUsed = async (payload: {token: string}) => {
    const response = await authRequest.post(`${authEndpoint}/check-token-in-used`, payload);
    return response;
};

const resetPassword = async (payload: IResetPasswordFormPayload) => {
    const response = await authRequest.post(`${authEndpoint}/reset-password`, payload);
    return response;
};

const authService = { loginUser, signUpUser, forgetPassword, checkTokenInUsed, resetPassword };
export default authService;
