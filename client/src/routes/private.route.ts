import InvoiceHistoryPage from '../pages/private/InvoiceHistory';
import MyAccountPage from '../pages/private/MyAccountPage';

export const privateRoutes = [
    {
        element: InvoiceHistoryPage,
        path: '/invoice_history',
    },
    {
        element: MyAccountPage,
        path: '/my_account',
    }
];