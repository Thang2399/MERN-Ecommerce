import { singleInvoiceType } from '../types/invoice';
import { singleItemTypes } from '../types/home';

export const defaultSingleInvoice: singleInvoiceType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    city: '',
    district: '',
    streetAddress: '',
    isShipToHome: true,
    isCodMethod: true,
    discountCode: '',
    cardNumber: '',
    cardHolderName: '',
    cardSecurityCode: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    invoiceId: '',
    totalPrice: '',
    listBoughtItems: [],
    invoiceStatus: '',
};