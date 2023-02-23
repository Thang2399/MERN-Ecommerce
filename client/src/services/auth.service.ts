import { defaultLoginFormTypes } from '../types/login';
import { signUpFormPayloadTypes } from '../types/signup';
import authRequest from './service';

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await authRequest.post('/user/login',  payload );
    return response;
};

const signUpUser = async (payload: signUpFormPayloadTypes) => {
    const response = await authRequest.post('user/signup', payload);
    return response;
};

const authService = { loginUser, signUpUser };
export default authService;
