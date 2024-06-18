export const USER_ROUTES = {
    // public routes
    DEFAULT: '/',
    PAYMENT: '/payment',
    CART: '/cart',

    // auth routes
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    FORGET_PASSWORD: '/forget-password',
    RESET_PASSWORD: '/reset-password',

    // private routes
    MY_ACCOUNT: '/my-account',
    INVOICE_HISTORY: '/invoice-history',
};

export const ADMIN_ROUTES = {
    DEFAULT: '/admin',
};

export const publicRoutesArr = [ USER_ROUTES.DEFAULT, USER_ROUTES.PAYMENT, USER_ROUTES.CART ];
export const authRoutesArr = [ USER_ROUTES.LOGIN, USER_ROUTES.SIGN_UP, USER_ROUTES.FORGET_PASSWORD, USER_ROUTES.RESET_PASSWORD ];
export const privateRoutesArr = [ USER_ROUTES.MY_ACCOUNT, USER_ROUTES.INVOICE_HISTORY ];
