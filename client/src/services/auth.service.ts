import { defaultLoginFormTypes } from '../types/login';
import { signUpFormPayloadTypes } from '../types/signup';
import authRequest from './service';
import { IResetPasswordFormPayload } from '../types/resetPassword';

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await authRequest.post('/user/login',  payload );
    return response;
};

const signUpUser = async (payload: signUpFormPayloadTypes) => {
    const response = await authRequest.post('user/signup', payload);
    return response;
};

const forgetPassword = async (payload: {email: string}) => {
    const response = await authRequest.post('user/forgot-password', payload);
    return response;
};

const resetPassword = async (payload: IResetPasswordFormPayload) => {
    const response = await authRequest.post('user/reset-password', payload);
    return response;
};

const authService = { loginUser, signUpUser, forgetPassword, resetPassword };
export default authService;
