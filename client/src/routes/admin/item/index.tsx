import React from 'react';
import InvoiceListPage from '../../../pages/admin/invoice';
import { useRoutes } from 'react-router-dom';

export default function ItemComponent(): JSX.Element {
    const routes = [
                {
            path: '/',
            element: <InvoiceListPage />
        }
    ];

    const routing = useRoutes(routes);

    return (
        <>{routing}</>
    );
}