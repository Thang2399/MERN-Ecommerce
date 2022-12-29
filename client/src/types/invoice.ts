import { singleItemTypes } from './home';

export type singleInvoiceType = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    country: string,
    city: string,
    district: string,
    streetAddress: string,
    isShipToHome: boolean,
    isCodMethod: boolean,
    discountCode: string,
    cardNumber: string,
    cardHolderName: string,
    cardSecurityCode: string,
    cardExpirationMonth: string,
    cardExpirationYear: string,
    invoiceId: string,
    totalPrice: string,
    listBoughtItems: singleItemTypes[],
    invoiceStatus: string
}