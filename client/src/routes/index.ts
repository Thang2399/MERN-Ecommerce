// common pages
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import PaymentPage from '../pages/PaymentPage';

// authentication pages
import SignUpPage from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';

const routes: any[] = [
    // common routes
    {
        element: HomePage,
        path: '/'
    },
    {
        element: CartPage,
        path: '/cart'
    },
    {
        element: PaymentPage,
        path: '/payment'
    },

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

export default routes;