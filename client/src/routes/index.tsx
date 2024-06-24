import { createBrowserRouter } from 'react-router-dom';
import { USER_ROUTES } from './constants';
import PublicLayout from '@/layouts/PublicLayout';
import AuthenLayoutWrapper from '@/layouts/AuthenLayoutWrapper';
import UserLayout from '@/layouts/UserLayout';

import HomePage from '@/pages/user/public/HomePage';
import LoginPage from '@/pages/user/auth/LoginPage';
import SignUpPage from '@/pages/user/auth/SignUpPage';
import ForgetPasswordPage from '@/pages/user/auth/ForgetPasswordPage';
import ResetPasswordPage from '@/pages/user/auth/ResetPasswordPage';
import PaymentPage from '@/pages/user/public/PaymentPage';
import CheckoutPage from '@/pages/user/public/CheckoutPage';
import MyAccountPage from '@/pages/user/private/MyAccountPage';
import InvoiceHistoryPage from '@/pages/user/private/InvoiceHistoryPage';
import MyAddressPage from '@/pages/user/private/MyAddressPage';
import DetailInvoiceHistoryPage from '@/pages/user/private/DetailInvoiceHistoryPage';
import ChangePasswordPage from '@/pages/user/public/ChangePasswordPage';

const router: any = createBrowserRouter([
    {
        element: <PublicLayout/>,
        children: [
            {
                path: USER_ROUTES.DEFAULT,
                element: <HomePage />
            },
            {
                path: USER_ROUTES.CHECKOUT,
                element: <CheckoutPage />
            },
            {
                path: USER_ROUTES.PAYMENT,
                element: <PaymentPage />
            },
            {
                path: USER_ROUTES.LOGIN,
                element: <AuthenLayoutWrapper />,
                children: [
                    {
                        path: USER_ROUTES.LOGIN,
                        element: <LoginPage/>
                    }
                ]
            },
            {
                path: USER_ROUTES.SIGN_UP,
                element: <AuthenLayoutWrapper />,
                children: [
                    {
                        path: USER_ROUTES.SIGN_UP,
                        element: <SignUpPage/>,
                    }
                ]
            },
            {
                path: USER_ROUTES.FORGET_PASSWORD,
                element: <AuthenLayoutWrapper/>,
                children: [
                    {
                        path: USER_ROUTES.FORGET_PASSWORD,
                        element: <ForgetPasswordPage/>,
                    }
                ]
            },
            {
                path: USER_ROUTES.RESET_PASSWORD,
                element: <AuthenLayoutWrapper/>,
                children: [
                    {
                        path: USER_ROUTES.RESET_PASSWORD,
                        element: <ResetPasswordPage/>,
                    }
                ]
            },
            {
                path: USER_ROUTES.MY_ACCOUNT,
                element: <UserLayout />,
                children: [
                    {
                        path: USER_ROUTES.MY_ACCOUNT,
                        element: <MyAccountPage/>
                    },
                ]
            },
            {
                path: USER_ROUTES.INVOICE_HISTORY,
                element: <UserLayout />,
                children: [
                    {
                        path: USER_ROUTES.INVOICE_HISTORY,
                        element: <InvoiceHistoryPage/>
                    },
                    {
                        path: USER_ROUTES.DETAIL_INVOICE_HISTORY,
                        element: <DetailInvoiceHistoryPage/>
                    },
                ]
            },
            {
                path: USER_ROUTES.MY_ADDRESS,
                element: <UserLayout />,
                children: [
                    {
                        path: USER_ROUTES.MY_ADDRESS,
                        element: <MyAddressPage/>
                    },
                ]
            },
            {
                path: USER_ROUTES.CHANGE_PASSWORD,
                element: <UserLayout />,
                children: [
                    {
                        path: USER_ROUTES.CHANGE_PASSWORD,
                        element: <ChangePasswordPage/>
                    },
                ]
            }
        ],
    },
]);


export default router;
