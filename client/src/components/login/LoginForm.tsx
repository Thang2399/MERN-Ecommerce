import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import BaseCheckbox from '../base/Checkbox';
import ErrorMessage from '../base/ErrorMessage';
import Button from '../base/Button';

import { defaultLoginFormTypes, loginFormErrorMessagesTypes } from '../../types/login';
import { defaultLoginForm, defaultLoginFormErrorMessages } from '../../form/login';

import { setCookie } from 'typescript-cookie';
import { checkValidateLoginForm } from '../../utils/login';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage, setUserCommonInfor } from '../../store/common';
import { COMMON_CONSTANTS, HTTP_STATUS } from '../../constants';
import axiosBase from '../../services/http-common';

const rememberMeOptionList = [
    {
        label: 'login_page.login_form.remember_me',
        value: false
    }
];
export default function LoginForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ loginForm, setLoginForm ] = useState<defaultLoginFormTypes>(defaultLoginForm);
    const [ loginFormErrorMessages, setLoginFormErrorMessages ] = useState<loginFormErrorMessagesTypes>(defaultLoginFormErrorMessages);

    const handleChangeLoginForm = (e: any) => {
        const inputValue = e.target.value;
        setLoginForm({
            ...loginForm,
            [e.target.name]: inputValue
        });
    };

    const redirectToSignUp = () => {
        navigate('/signup');
    };

    const redirectToForgetPassword = () => {
        navigate('/forget-password');
    };

    const onLoginUser = async (payload: defaultLoginFormTypes) => {
        dispatch(setShowLoadingIcon(true));
        try {
            const res = await services.loginUser(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS){
                const data = res.data.data;
                setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, data.accessToken);
                setCookie(COMMON_CONSTANTS.USER_ID, data._id);
                setCookie(COMMON_CONSTANTS.USER_ROLE, data.userRole);
                setCookie(COMMON_CONSTANTS.USER_EMAIL, payload.email);
                dispatch(setUserCommonInfor({
                    accessToken: data.accessToken,
                    role: data.role,
                    id: data._id,
                    email: payload.email
                }));
                axiosBase.defaults.headers['Authorization'] = data.accessToken;
                 dispatch(setShowLoadingIcon(false));
                 navigate('/');
                 dispatch(setShowToastMessage({
                    show: true,
                    message: 'login_page.response_message.login_success',
                    type: 'success'
                }));
            }
        }
        catch (err: any) {
            console.log('error', err);
            dispatch(setShowLoadingIcon(false));
            dispatch(setShowToastMessage({
                    show: true,
                    message: 'login_page.response_message.wrong_email_or_password',
                    type: 'error'
            }));
        }
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        const errorMessages = checkValidateLoginForm(loginForm);
        setLoginFormErrorMessages(errorMessages);

        let error = 0;
        let key: keyof loginFormErrorMessagesTypes;
        for (key in errorMessages) {
            if (errorMessages[key].message !== '') error ++;
        }

        if (error === 0) {
            onLoginUser(loginForm);
        }
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            <Typography
                content={'login_page.label'}
                className={'text-3xl font-semibold mb-4'}
            />

            <form>
                <div>
                    <Typography
                        content={'login_page.login_form.email'}
                        className={'text-base mb-2'}
                    />
                    <InputTextField
                        handleChange={handleChangeLoginForm}
                        placeholder={'login_page.login_form.email_placeholder'}
                        type={'email'}
                        value={loginForm.email}
                        inputName={'email'}
                        className={'border mb-1'}
                    />
                    <ErrorMessage
                        errorMessage={loginFormErrorMessages.email.message}
                        field={loginFormErrorMessages.email.field}
                    />
                </div>

                <div className={'mt-2'}>
                    <Typography
                        content={'login_page.login_form.password'}
                        className={'text-base mb-2'}
                    />
                    <InputTextField
                        handleChange={handleChangeLoginForm}
                        placeholder={'login_page.login_form.password_placeholder'}
                        type={'password'}
                        value={loginForm.password}
                        inputName={'password'}
                        className={'border mb-1'}
                        isPasswordField={true}
                    />
                    <ErrorMessage
                        errorMessage={loginFormErrorMessages.password.message}
                        field={loginFormErrorMessages.password.field}
                    />
                </div>

                <div className={'mt-6 flex justify-between items-center'}>
                    <BaseCheckbox checkboxList={rememberMeOptionList} />

                    <div className={'cursor-pointer'} onClick={redirectToForgetPassword}>
                        <Typography
                            content={'login_page.forgot_password'}
                            className={'text-base text-gray-500 underline hover:text-cyan-700 hover:no-underline'}
                        />
                        </div>
                </div>
                
                <div className={'mt-6'}>
                    <Button 
                        handleClick={handleLogin} 
                        content={'login_page.login_form.submit_btn'}
                        typoClassName={'text-white text-2xl'}
                    />
                </div>

                <div className={'flex mt-4'}>
                        <Typography
                            content={'login_page.not_have_an_account'}
                            className={'mr-1 text-base'}
                        />
                        <div className={'cursor-pointer'} onClick={redirectToSignUp}>
                            <Typography
                                content={'login_page.sign_up_now'}
                                className={'text-base text-gray-500 underline hover:text-cyan-700 hover:no-underline'}
                            />
                        </div>
                    </div>
            </form>
        </div>
    );
}
