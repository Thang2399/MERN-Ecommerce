import authRequest from './service';

const getListItems = async (query: any) => {
    const response = await authRequest.get('/items', { params: query });
    return response;
};

const getSingleItem = async (id: string) => {
    const response = await authRequest.get(`/items/${id}`);

    return response;
};

const itemService = { getListItems, getSingleItem };

export default itemService;
