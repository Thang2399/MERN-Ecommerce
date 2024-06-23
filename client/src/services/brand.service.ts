import baseRequest from '@/services/config/service';

const endpoint = '/brand';

const getListBrands = async () => {
    const response = await baseRequest.get(`${endpoint}`);

    return response;
};

const getSpecificBrand = async (id: string) => {
    const response = await baseRequest.get(`${endpoint}/${id}`);
    return response;
};

const brandService = { getListBrands, getSpecificBrand };

export default brandService;
