import baseRequest from './config/service';

const endpoint = '/item';

const getListItems = async (query: any) => {
    const response = await baseRequest.get(`${endpoint}`, { params: query });
    return response;
};

const getSingleItem = async (id: string) => {
    const response = await baseRequest.get(`${endpoint}/${id}`);

    return response;
};

const itemService = { getListItems, getSingleItem };

export default itemService;
