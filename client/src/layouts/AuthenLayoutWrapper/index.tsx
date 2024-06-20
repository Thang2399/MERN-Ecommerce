import Image from '@/components/base/Image';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { USER_ROUTES } from '@/routes/constants';
import { setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import { setShowToastMessage } from '@/store/common';
import { useDispatch } from 'react-redux';

export default function AuthenLayoutWrapper(): JSX.Element {
    const location = useLocation();
    const pathname = location.pathname;
    const imageUrl = pathname === USER_ROUTES.LOGIN || pathname === USER_ROUTES.FORGET_PASSWORD ? '/assets/images/login-image.jpeg' : '/assets/images/signup-image.jpeg';

    const [ searchParams, setSearchParams ] = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const errorCode = searchParams.get('errorCode');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken && refreshToken) {
            setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, accessToken);
            localStorage.setItem(COMMON_CONSTANTS.REFRESH_TOKEN, refreshToken);
            searchParams.delete('accessToken');
            searchParams.delete('refreshToken');
            setSearchParams(searchParams);

            navigate('/');
            dispatch(setShowToastMessage({
                show: true,
                message: 'login_page.response_message.login_success',
                type: 'success'
            }));
        } else if (errorCode) {
            dispatch(setShowToastMessage({
                show: true,
                message: 'login_page.response_message.login_failed',
                type: 'error'
            }));
        }
    }, [ accessToken, refreshToken ]);


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
