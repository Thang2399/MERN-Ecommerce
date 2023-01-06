import axios from 'axios';
import { defaultLoginFormTypes } from '../types/login';
import { signUpFormPayloadTypes } from '../types/signup';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await axios.post(`${endpoint}/user/login`, payload);
    return response;
};

const signUpUser = async (payload: signUpFormPayloadTypes) => {
    const response = await axios.post(`${endpoint}/user/signup`, payload);
    return response;
};

const auth = { loginUser, signUpUser };
export default auth;
