import axios from 'axios';
import { userInforFormType } from '../types/cart';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const createInvoice = async ( payload: userInforFormType ) => {
    const response = await axios.post(`${endpoint}/invoices`, payload);
    return response;
};

const cart = { createInvoice };

export default cart;