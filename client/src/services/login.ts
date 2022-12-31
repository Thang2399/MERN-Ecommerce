import axios from 'axios';
import { defaultLoginFormTypes } from '../types/login';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const loginUser = async (payload: defaultLoginFormTypes) => {
    const response = await axios.post(`${endpoint}/user/login`, payload);
    return response;
};

const login = { loginUser };
export default login;
