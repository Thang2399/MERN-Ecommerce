import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import LoadingIcon from '@/components/common/LoadingIcon';
import ToastMessage from '@/components/common/ToastMessage';

export default function App(): JSX.Element {
    return (
        <>
            <RouterProvider router={router} />
            <LoadingIcon />
            <ToastMessage />
        </>
    );
}
