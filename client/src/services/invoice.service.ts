import authRequest from './service';

const getListInvoices = async (payload: {email: string}) => {
    const response = await authRequest.get('/invoices', { params: payload });
    return response;
};

const invoiceService = { getListInvoices };
export default invoiceService;