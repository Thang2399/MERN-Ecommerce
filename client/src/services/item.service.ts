import baseRequest from './service';

const getListItems = async (query: any) => {
    const response = await baseRequest.get('/items', { params: query });
    return response;
};

const getSingleItem = async (id: string) => {
    const response = await baseRequest.get(`/items/${id}`);

    return response;
};

const itemService = { getListItems, getSingleItem };

export default itemService;
