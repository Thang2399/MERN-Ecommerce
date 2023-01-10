import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../components/base/Image';
import LoginForm from '../components/login/LoginForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function LoginPage(): JSX.Element {
    const navigate = useNavigate();
    const accessToken = useSelector((state: RootState) => state.commonReducer.userCommonInfor.accessToken);

    const checkUserLoginOrNot = () => {
        if (accessToken) {
            navigate('/');
        }
    };

    useEffect(() => {
        checkUserLoginOrNot();
    }, [ accessToken ]);

    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'w-full flex'}>
                <div className={'w-3/5 justify-center items-center'}>
                    <div className={'w-4/5'}>
                        <Image imgUrl={'/assets/images/login-image.jpeg'}/>
                    </div>
                </div>
                <div className={'w-2/5'}>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

