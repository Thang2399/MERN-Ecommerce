import Image from '@/components/base/Image';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { USER_ROUTES } from '@/routes/constants';
import { setCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '@/constants';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { useDispatch } from 'react-redux';
import services from '@/services';
import PopupAlert from '@/components/common/PopupAlert';

export default function AuthenLayoutWrapper(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const pathname = location.pathname;
    const imageUrl = pathname === USER_ROUTES.LOGIN || pathname === USER_ROUTES.FORGET_PASSWORD ? '/assets/images/login-image.jpeg' : '/assets/images/signup-image.jpeg';

    const [ searchParams, setSearchParams ] = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const errorCode = searchParams.get('errorCode');

    const resetPasswordToken = searchParams.get('token');
    const [ isResetPasswordTokenInUsed, setIsResetPasswordTokenInUsed ] = useState<boolean>(false);

    const handleCheckTokenInUse = async () => {
        if (resetPasswordToken) {
            try {
                dispatch(setShowLoadingIcon(true));
                const payload = { token: resetPasswordToken };
                const res = await services.checkTokenInUsed(payload);
                if (res) {
                    setIsResetPasswordTokenInUsed(res.data.isInUsed);
                }
            } catch (err) {
                console.log(err);
                setIsResetPasswordTokenInUsed(true);
            }
            dispatch(setShowLoadingIcon(false));
        }
    };

    const handleNavigateToForgetPasswordPage = () => {
        navigate(USER_ROUTES.FORGET_PASSWORD);
    };

    useEffect(() => {
        if (pathname.includes(USER_ROUTES.RESET_PASSWORD)) {
            if (resetPasswordToken) {
                handleCheckTokenInUse();
            } else {
                handleNavigateToForgetPasswordPage();
            }
        }
    }, [ pathname, resetPasswordToken ]);

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
        <div
            className={`flex items-center justify-center w-full ${pathname === USER_ROUTES.SIGN_UP ? 'h-fit' : 'h-full'} overflow-auto`}>
            {(!isResetPasswordTokenInUsed || !pathname.includes(USER_ROUTES.RESET_PASSWORD))
                ? (
                    <div className={'w-full flex items-center'}>
                        <div className={'w-3/5'}>
                            <div className={'w-full'}>
                                <Image imgUrl={imageUrl}/>
                            </div>
                        </div>
                        <div className={'w-2/5'}>
                            <Outlet/>
                        </div>
                    </div>
                )
                : (<>
                        <PopupAlert
                            openModal={isResetPasswordTokenInUsed}
                            popupTitle={'reset_password_page.popup.title'}
                            popupLabel={'reset_password_page.popup.label'}
                            confirmButtonLabel={'reset_password_page.popup.confirm'}
                            handleConfirm={handleNavigateToForgetPasswordPage}
                        />
                    </>
                )
            }

        </div>
    );
}
