import SignUpPage from '../pages/auth/SignUpPage';
import LoginPage from '../pages/auth/LoginPage';
import ForgetPasswordPage from '../pages/auth/ForgetPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

export const authRoutes = [
    // authentication routes
    {
        element: SignUpPage,
        path: '/signup'
    },
    {
        element: LoginPage,
        path: '/login'
    },
    {
        element: ForgetPasswordPage,
        path: '/forget-password'
    },
    {
        element: ResetPasswordPage,
        path: '/reset-password'
    },
];