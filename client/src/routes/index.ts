import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import PaymentPage from '../pages/PaymentPage';

const routes: any[] = [
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
    }
];

export default routes;