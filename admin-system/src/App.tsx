import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoutes from './routes/private';
import LoginPage from './pages/auth/LoginPage';
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forget-password" element={<ForgetPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/*" element={<PrivateRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}

