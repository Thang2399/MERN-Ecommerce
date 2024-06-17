import baseRequest from './service';

const getListInvoices = async (payload: {email: string}) => {
    const response = await baseRequest.get('/invoices', { params: payload });
    return response;
};

const invoiceService = { getListInvoices };
export default invoiceService;
