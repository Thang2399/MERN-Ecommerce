import { createBrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import { USER_ROUTES } from './constants';
import UserLayout from '@/layouts/UserLayout';
import HomePage from '@/pages/user/public/HomePage';
import LoginPage from '@/pages/user/auth/LoginPage';
import SignUpPage from '@/pages/user/auth/SignUpPage';
import ForgetPasswordPage from '@/pages/user/auth/ForgetPasswordPage';
import ResetPasswordPage from '@/pages/user/auth/ResetPasswordPage';


const router: any = createBrowserRouter([
    {
        element: <UserLayout/>,
        children: [
            {
                path: USER_ROUTES.DEFAULT,
                element: <HomePage />
            },
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
