import baseRequest from '@/services/config/service';
import { createUserAddressType, deleteUserAddressType } from '@/types/userAddress';

const endpoint = '/user-address';

const getListUserAddressByUserId = async (query: any) => {
    const response = await baseRequest.get(`${endpoint}`, { params: query });
    return response;
};

const getDetailUserAddress = async (id: string) => {
    const response = await baseRequest.get(`${endpoint}/${id}`);
    return response;
};

const createUserAddress = async (payload: createUserAddressType) => {
    const response = await baseRequest.post(`${endpoint}`, payload);
    return response;
};

const deleteUserAddress = async (payload: deleteUserAddressType) => {
    const response = await baseRequest.delete(`${endpoint}`, { data: payload });
    return response;
};

const updateUserAddress = async (id: string, payload: createUserAddressType) => {
    const response = await baseRequest.put(`${endpoint}/${id}`, payload);
    return response;
};

const userAddressServices = {
    getListUserAddressByUserId,
    getDetailUserAddress,
    createUserAddress,
    deleteUserAddress,
    updateUserAddress
};

export default userAddressServices;
