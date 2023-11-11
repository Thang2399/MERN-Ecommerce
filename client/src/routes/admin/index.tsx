import AccountComponent from './account';
import InvoiceComponent from './invoice';
import ItemComponent from './item';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminRoutes(): JSX.Element {
    const adminRoutes: any[] = [
        {
            path: '/account/*',
            resource: 'account',
            element: AccountComponent
        },
        {
            path: '/invoice/*',
            resource: 'invoice',
            element: InvoiceComponent
        },
        {
            path: '/item/*',
            resource: 'item',
            element: ItemComponent
        },
        // {
        //     path: '/store/*',
        //     resource: 'store',
        //     element: StoreComponent
        // }
    ];

    return (
        <>
            <Routes>
                <Route element={<AdminLayout/>}>
                    {adminRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={route.element}/>
                    ))}
                </Route>
            </Routes>
        </>
    );
}
