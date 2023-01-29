import authRequest from './service';

const getListInvoices = async () => {
    const response = await authRequest.get('/invoices');
    return response;
};

const invoiceService = { getListInvoices };
export default invoiceService;