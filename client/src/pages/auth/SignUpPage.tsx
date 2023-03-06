import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Image from '../../components/base/Image';
import SignUpForm from '../../components/signup/SignUpForm';

export default function SignUpPage():JSX.Element {
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
                <div className={'w-3/5 flex justify-center items-center'}>
                    <div className={'w-4/5'}>
                        <Image imgUrl={'/assets/images/signup-image.jpeg'}/>
                    </div>
                </div>
                <div className={'w-2/5'}>
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
}
