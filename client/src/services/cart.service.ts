import { userInforFormType } from '../types/cart';
import authRequest from './service';

const createInvoice = async ( payload: userInforFormType ) => {
    const response = await authRequest.post('/invoices', payload);

    return response;
};

const cartService = { createInvoice };

export default cartService;