import authRequest from '@/services/service';

const getListBrands = async () => {
    const response = await authRequest.get('/brand');

    return response;
};

const getSpecificBrand = async (id: string) => {
    const response = await authRequest.get(`/brand/${id}`);
    return response;
};

const brandService = { getListBrands, getSpecificBrand };

export default brandService;
