export enum Shipping_Method_Enum {
    AT_HOME = 'at-home',
    AT_STORE = 'at-store',
}

export enum Payment_Method_Enum {
    COD = 'cod',
    CARD = 'card',
}

export const optionsListShippingMethod = [
    {
        label: 'cart_page.checkout_form.card_options_list.home',
        value: Shipping_Method_Enum.AT_HOME
    },
    {
        label: 'cart_page.checkout_form.card_options_list.store',
        value: Shipping_Method_Enum.AT_STORE
    }
];

export const optionsListPaymentMethod = [
    {
        label: 'cart_page.checkout_form.card_options_list.ship_cod',
        value: Payment_Method_Enum.COD
    },
    {
        label: 'cart_page.checkout_form.card_options_list.card',
        value: Payment_Method_Enum.CARD
    }
];
