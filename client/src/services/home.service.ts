import authRequest from './service';


const getListItems = async () => {
    const response = await authRequest.get('/items');
    return response;
};

const getSingleItem = async (id: string) => {
    const response = await authRequest.get(`/items/${id}`);

    return response;
};

const homeService = { getListItems, getSingleItem };

export default homeService;