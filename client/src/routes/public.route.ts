import HomePage from '../pages/public/HomePage';
import CartPage from '../pages/public/CartPage';
import PaymentPage from '../pages/public/PaymentPage';
import NotFoundPage from '../pages/public/NotFoundPage';

export const publicRoutes = [
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
    {
        element: NotFoundPage,
        path: '*'
    },
];