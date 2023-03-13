import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout(): JSX.Element {
    return (
        <div>
            <Outlet />
        </div>
    );
}