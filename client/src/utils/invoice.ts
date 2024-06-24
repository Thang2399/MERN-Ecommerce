import { Payment_Method_Enum, Payment_Status, Shipping_Method_Enum } from '@/constants/checkout';
import { invoiceStatusArr } from '@/constants/invoice';

export const convertShippingMethod = (shippingMethod: string) => {
    return shippingMethod === Shipping_Method_Enum.AT_STORE ? 'store' : 'home';
};

export const convertPaymentMethod = (paymentMethod: string) => {
    return paymentMethod === Payment_Method_Enum.COD ? 'ship_cod' : 'card';
};

export const convertPaymentStatus = (paymentStatus: string) => {
    if (paymentStatus === Payment_Status.SUCCESS) return 'success';
    else if (paymentStatus === Payment_Status.PENDING) return 'pending';
    return 'failed';
};

export const convertInvoiceStatus = (invoiceStatus: string) => {
    const specificInvoiceStatus = invoiceStatusArr.find((status: {
        label: string,
        value: string
    }) => status.value === invoiceStatus);
    return specificInvoiceStatus?.label || invoiceStatusArr[0].label;
};
