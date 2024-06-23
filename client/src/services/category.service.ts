import baseRequest from './config/service';

const endpoint = '/category';

const getListCategoriesWithTypicalItems = async (query: any) => {
    const response = await baseRequest.get(`${endpoint}/typical-items`, { params: query });
    return response;
};

const categoryService = { getListCategoriesWithTypicalItems };
export default categoryService;
