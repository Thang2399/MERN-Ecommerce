import baseRequest from './config/service';

const getListCategoriesWithTypicalItems = async (query: any) => {
    const response = await baseRequest.get('/category/typical-items', { params: query });
    return response;
};

const categoryService = { getListCategoriesWithTypicalItems };
export default categoryService;
