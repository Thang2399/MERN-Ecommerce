import Image from '@/components/base/Image';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { USER_ROUTES } from '@/routes/constants';

export default function AuthenLayoutWrapper(): JSX.Element {
    const location = useLocation();
    const pathname = location.pathname;
    const imageUrl = pathname === USER_ROUTES.LOGIN || pathname === USER_ROUTES.FORGET_PASSWORD ? '/assets/images/login-image.jpeg' : '/assets/images/signup-image.jpeg';

    return (
        <div className={'flex items-center justify-center w-full h-screen'}>
            <div className={'w-full flex items-center'}>
                <div className={'w-3/5 flex justify-center items-center'}>
                    <div className={'w-4/5'}>
                        <Image imgUrl={imageUrl}/>
                    </div>
                </div>
                <div className={'w-2/5'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
