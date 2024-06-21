import { userInforFormType } from '../types/cart';
import baseRequest from './config/service';

const createInvoice = async ( payload: userInforFormType ) => {
    const response = await baseRequest.post('/invoices', payload);

    return response;
};

const cartService = { createInvoice };

export default cartService;
