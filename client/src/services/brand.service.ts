import baseRequest from '@/services/service';

const getListBrands = async () => {
    const response = await baseRequest.get('/brand');

    return response;
};

const getSpecificBrand = async (id: string) => {
    const response = await baseRequest.get(`/brand/${id}`);
    return response;
};

const brandService = { getListBrands, getSpecificBrand };

export default brandService;
