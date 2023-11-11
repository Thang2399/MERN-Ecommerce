import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout(): JSX.Element {
    return (
        <div>
            <h1>hello</h1>
            <Outlet />
            <h1>123</h1>
        </div>
    );
}