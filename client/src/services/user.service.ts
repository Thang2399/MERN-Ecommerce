import baseRequest from '@/services/config/service';
import { changeUserTypes, updateUserTypes } from '@/types/user';

const authEndpoint = '/auth';

const getDetailUserInformation = async (id: string) => {
    const response = await baseRequest.get(`${authEndpoint}/users/${id}`);
    return response;
};

const updateUserInformation = async (id: string, payload: updateUserTypes) => {
    const response = await baseRequest.put(`${authEndpoint}/users/${id}`, payload);
    return response;
};

const changeUserPassword = async (payload: changeUserTypes) => {
    const response = await baseRequest.post(`${authEndpoint}/users/change-password}`, payload);
    return response;
};

const userServices = {
    getDetailUserInformation,
    updateUserInformation,
    changeUserPassword
};

export default userServices;
