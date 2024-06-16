import { createBrowserRouter } from 'react-router-dom';
import { USER_ROUTES } from './constants';
import PublicLayout from '@/layouts/PublicLayout';
import PrivateLayout from '@/layouts/PrivateLayout';
import AuthenLayout from '@/layouts/AuthenLayout';

import HomePage from '@/pages/user/public/HomePage';
import LoginPage from '@/pages/user/auth/LoginPage';
import SignUpPage from '@/pages/user/auth/SignUpPage';
import ForgetPasswordPage from '@/pages/user/auth/ForgetPasswordPage';
import ResetPasswordPage from '@/pages/user/auth/ResetPasswordPage';
import PaymentPage from '@/pages/user/public/PaymentPage';
import CartPage from '@/pages/user/public/CartPage';
import MyAccountPage from '@/pages/user/private/MyAccountPage';
import InvoiceHistoryPage from '@/pages/user/private/InvoiceHistoryPage';

const router: any = createBrowserRouter([
    {
        element: <PublicLayout/>,
        children: [
            {
                path: USER_ROUTES.DEFAULT,
                element: <HomePage />
            },
            {
                path: USER_ROUTES.CART,
                element: <CartPage />
            },
            {
                path: USER_ROUTES.PAYMENT,
                element: <PaymentPage />
            },
        ],
    },
    {
        element: <PublicLayout />,
        children: [
            {
                path: USER_ROUTES.MY_ACCOUNT,
                element: <MyAccountPage />
            },
            {
                path: USER_ROUTES.INVOICE_HISTORY,
                element: <InvoiceHistoryPage />
            }
        ]
    },
    {
        element: <AuthenLayout/>,
        children: [
            {
                path: USER_ROUTES.LOGIN,
                element: <LoginPage/>
            },
            {
                path: USER_ROUTES.SIGN_UP,
                element: <SignUpPage/>,
            },
            {
                path: USER_ROUTES.FORGET_PASSWORD,
                element: <ForgetPasswordPage/>,
            },
            {
                path: USER_ROUTES.RESET_PASSWORD,
                element: <ResetPasswordPage/>,
            },
        ],
    },
]);


export default router;
