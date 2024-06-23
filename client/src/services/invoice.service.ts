import baseRequest from './config/service';
import { checkoutFormType, userInforFormType } from '@/types/cart';

const endpoint = '/invoice';

const getListInvoices = async (payload: {email: string}) => {
    const response = await baseRequest.get(`${endpoint}`, { params: payload });
    return response;
};

const createInvoice = async ( payload: checkoutFormType ) => {
    const response = await baseRequest.post(`${endpoint}`, payload);

    return response;
};

const invoiceService = { getListInvoices, createInvoice };
export default invoiceService;
