import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/base/Button/Button';
import React from 'react';

export default function LoginWithGoogleButton() {
    const handleLoginWithGoogle = () => {
        const newPath = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        const redirectRoute = `${process.env.REACT_APP_SERVER_END_POINT}/auth/google/redirect?redirect_url=${newPath}`;
        window.location.href = redirectRoute;
    };

    return (
        <Button
            content={'login_page.login_form.login_with_google'}
            typoClassName={'text-gray-600 text-xl'}
            dataTest={'loginGoogleBtn'}
            icon={<FcGoogle/>}
            buttonClassName={'border border-gray-400 text-black'}
            handleClick={() => handleLoginWithGoogle()}
        />
    );
}
