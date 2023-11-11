import { useRoutes } from 'react-router-dom';
import AccountListPage from '../../../pages/admin/account';

export default function AccountComponent (): JSX.Element {
    const routes = [
        {
            path: '/',
            element: <AccountListPage />
        }
    ];
    
    const routing = useRoutes(routes);
    return (
        <>{routing}</>
    );
}