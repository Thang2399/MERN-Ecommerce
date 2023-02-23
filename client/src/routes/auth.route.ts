import SignUpPage from '../pages/auth/SignUp';
import LoginPage from '../pages/auth/LoginPage';

export const authRoutes = [
    // authentication routes
    {
        element: SignUpPage,
        path: '/signup'
    },
    {
        element: LoginPage,
        path: '/login'
    }
];