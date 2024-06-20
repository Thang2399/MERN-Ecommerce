import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/base/Image';
import LoginForm from '../../../components/login/LoginForm';
import { USER_ROUTES } from '@/routes/constants';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import AuthenLayoutWrapper from '@/layouts/AuthenLayoutWrapper';

const LoginPage = () => {
    return <LoginForm />;
};

export default LoginPage;

