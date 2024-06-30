export const INVOICE_STATUS = {
    RECEIVED_ORDER: 'received_order',
    CHECKING_IN_STOCK: 'checking_in_stock',
    PREPARING_ITEMS: 'preparing_items',
    PACKAGED_ITEMS: 'package_items',
    DELIVERING: 'delivering',
    DELIVERED_SUCCESS: 'delivered_success',
    DELIVERED_FAILED: 'delivered_failed',
    CANCELED_OUT_OF_STOCK: 'cancel_out_of_stock'
};

export const invoiceStatusArr = [
    {
        value: 'RECEIVED_ORDER',
        label: INVOICE_STATUS.RECEIVED_ORDER
    },
    {
        value: 'PREPARING_ITEMS',
        label: INVOICE_STATUS.PREPARING_ITEMS
    },
    {
        value: 'DELIVERING',
        label: INVOICE_STATUS.DELIVERING
    },
    {
        value: 'DELIVERING',
        label: INVOICE_STATUS.DELIVERING
    },
    {
        value: 'SUCCESS',
        label: INVOICE_STATUS.DELIVERED_SUCCESS
    },
    {
        value: 'FAILED',
        label: INVOICE_STATUS.DELIVERED_FAILED
    },
    {
        value: 'CANCELED_OUT_OF_STOCK',
        label: INVOICE_STATUS.CANCELED_OUT_OF_STOCK
    },
];
