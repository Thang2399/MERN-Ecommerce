import React from 'react';
import Image from '../../../components/base/Image';
import ForgetPasswordForm from '../../../components/forgetPassword/ForgetPasswordForm';

export default function ForgetPasswordPage(): JSX.Element {
    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'w-full flex items-center'}>
                <div className={'w-3/5 justify-center items-center'}>
                    <div className={'w-4/5'}>
                        <Image imgUrl={'/assets/images/login-image.jpeg'}/>
                    </div>
                </div>
                <div className={'w-2/5'}>
                    <ForgetPasswordForm />
                </div>
            </div>
        </div>
    );
}
