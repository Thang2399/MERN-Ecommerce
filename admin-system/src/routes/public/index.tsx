import React, { useEffect } from 'react';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../../constants';
import { useNavigate, Routes, Route, useRoutes } from 'react-router-dom';

import LoginPage from '../../pages/auth/LoginPage';
import ForgetPasswordPage from '../../pages/auth/ForgetPasswordPage';
import ResetPasswordPage from '../../pages/auth/ResetPasswordPage';
import PublicLayout from '../../layout/public';

export default function PublicRoutes (): JSX.Element {
    const accessToken = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    const navigate = useNavigate();

    // const checkUserLoginOrNot = () => {
    //     if (accessToken) {
    //         navigate('/');
    //     }
    // };
    //
    // useEffect(() => {
    //     checkUserLoginOrNot();
    // }, []);

    const routes = [
        {
            path: '/',
            element: <LoginPage />
        },
        {
            path: '/forget-password',
            element: <ForgetPasswordPage />
        },
        {
            path: '/reset-password',
            element: <ResetPasswordPage />
        }
    ];


    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Route>
        </Routes>
    );
}