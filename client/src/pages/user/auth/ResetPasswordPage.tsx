import React, { useState, useEffect } from 'react';
import Image from '../../../components/base/Image';
import PopupAlert from '../../../components/common/PopupAlert';
import ResetPasswordForm from '../../../components/resetPassword/ResetPasswordForm';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import services from '@/services';
import { setShowLoadingIcon } from '@/store/common';

export default function ResetPasswordPage(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const [ isTokenInUsed, setIsTokenInUsed ] = useState<boolean>(false);
    
    const handleNavigateToForgetPasswordPage = () => {
        navigate('/forget-password');
    };

    const handleCheckTokenInUse = async () => {
        if (token) {
            try {
                dispatch(setShowLoadingIcon(true));
                const payload = { token };
                const res = await services.checkTokenInUsed(payload);
                if (res) {
                    setIsTokenInUsed(res.data.isInUsed);
                }
            } catch (err) {
                console.log(err);
                setIsTokenInUsed(true);
            }
            dispatch(setShowLoadingIcon(false));
        }

    };

    useEffect(() => {
        if (token) {
            handleCheckTokenInUse();
        } else {
            handleNavigateToForgetPasswordPage();
        }
    }, []);

    const handleOk = () => {
        handleNavigateToForgetPasswordPage();
    };
    return (
        <>
            {
                !isTokenInUsed
                    ? (
                        <>
                            <ResetPasswordForm />
                        </>
                    )
                    : (
                        <div className={'absolute top-0 left-0 z-50'}>
                            <PopupAlert
                                popupTitle={'reset_password_page.popup.title'}
                                popupLabel={'reset_password_page.popup.label'}
                                confirmButtonLabel={'reset_password_page.popup.confirm'}
                                handleConfirm={handleOk}
                            />
                        </div>
                    )
            }
        </>


    );
}
