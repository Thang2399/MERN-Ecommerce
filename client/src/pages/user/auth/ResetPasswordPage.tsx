import React, { useState, useEffect } from 'react';
import Image from '../../../components/base/Image';
import PopupAlert from '../../../components/common/PopupAlert';
import ResetPasswordForm from '../../../components/resetPassword/ResetPasswordForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage(): JSX.Element {
    const navigate = useNavigate();
    const forgetPasswordEmail = useSelector((state: RootState) => state.forgetPasswordReducer.forgetPasswordEmail);
    const [ isUserClickOkButton, setIsUserClickOkButton ] = useState<boolean>(false);
    
    const handleNavigateToForgetPasswordPage = () => {
        if (!forgetPasswordEmail) {
            navigate('/forget-password');
        }
    };

    useEffect(() => {
        handleNavigateToForgetPasswordPage();
    }, []);

    const handleOk = () => {
        setIsUserClickOkButton(true);
    };
    return (
        <>
            {
                isUserClickOkButton
                    ? (
                        <div className={'flex items-center justify-center w-full h-full'}>
                            <div className={'w-full flex'}>
                                <div className={'w-3/5 flex justify-center items-center'}>
                                    <div className={'w-4/5'}>
                                        <Image imgUrl={'/assets/images/signup-image.jpeg'}/>
                                    </div>
                                </div>
                                <div className={'w-2/5'}>
                                    <ResetPasswordForm />
                                </div>
                            </div>
                        </div>
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
