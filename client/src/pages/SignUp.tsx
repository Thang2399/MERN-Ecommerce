import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
        <div>
            <h1>Signup Page</h1>
        </div>
    );
}
