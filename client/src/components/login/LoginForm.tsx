import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from '../base/Typography';
import * as yup from 'yup';
import Button from '../base/Button';

import { defaultLoginFormTypes } from '@/types/login';
import { defaultLoginForm } from '@/form/login';

import { setCookie } from 'typescript-cookie';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { COMMON_CONSTANTS, HTTP_STATUS } from '@/constants';
import { USER_ROUTES } from '@/routes/constants';
import { FIELD_TYPE } from '@/constants/field';
import { FieldProps } from '@/types/field';
import RenderFormField from '@/components/base/RenderFormField';
import { Formik, Form  } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';

export default function LoginForm(): JSX.Element {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ checked, setChecked ] = useState<boolean>(true);

    const loginValidationSchema = yup.object({
        email: yup
            .string()
            .required('error_messages.filed_required')
            .email('error_messages.wrong_email_validate'),
        password: yup
            .string()
            .required('error_messages.filed_required'),
    });

    const formFieldsArr = [
        {
            label: 'login_page.login_form.email',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'email',
            placeholder: 'login_page.login_form.email_placeholder',
            inputName: 'email',
            dataTest: 'email',
            errorMessageField: 'form.email_address',
            errorMessageDataTest: 'errorEmail'
        },
        {
            label: 'login_page.login_form.password',
            fieldType: FIELD_TYPE.PASSWORD,
            htmlFor: 'password',
            placeholder: 'login_page.login_form.password_placeholder',
            inputName: 'password',
            dataTest: 'password',
            errorMessageField: 'form.password',
            errorMessageDataTest: 'errorEmail'
        }
    ];

    const redirectToSignUp = () => {
        navigate(`${USER_ROUTES.SIGN_UP}`);
    };

    const redirectToForgetPassword = () => {
        navigate(`${USER_ROUTES.FORGET_PASSWORD}`);
    };

    const onLoginUser = async (payload: defaultLoginFormTypes) => {
        dispatch(setShowLoadingIcon(true));
        try {
            const res = await services.loginUser(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                const data = res.data;
                setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, data.accessToken);
                if (payload.remember) {
                    localStorage.setItem(COMMON_CONSTANTS.REFRESH_TOKEN, data.refreshToken);
                }

                dispatch(setShowLoadingIcon(false));
                navigate('/');
                dispatch(setShowToastMessage({
                    show: true,
                    message: 'login_page.response_message.login_success',
                    type: 'success'
                }));
            }
        } catch (err: any) {
            console.log('error', err);
            dispatch(setShowLoadingIcon(false));
            dispatch(setShowToastMessage({
                show: true,
                message: 'login_page.response_message.wrong_email_or_password',
                type: 'error'
            }));
        }
    };

    const handleLogin = (values: defaultLoginFormTypes) => {
        const payload = {
            ...values,
            remember: checked
        };
        onLoginUser(payload);
    };

    const handleLoginWithGoogle = () => {
        const newPath = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        const redirectRoute = `${process.env.REACT_APP_SERVER_END_POINT}/auth/google/redirect?redirect_url=${newPath}`;
        console.log('redirectRoute', redirectRoute);
        window.location.href = redirectRoute;
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            <Typography
                content={'login_page.label'}
                className={'text-3xl font-semibold mb-4'}
                dataTest={'login-title'}
            />

            <Formik
                initialValues={defaultLoginForm}
                enableReinitialize={true}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
            >
                {({ values: formikValues, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        {formFieldsArr.map((field: FieldProps) => {
                            return (
                                <React.Fragment key={field.inputName}>
                                    <div className="mt-3">
                                        <RenderFormField
                                            field={field}
                                            formikValues={formikValues}
                                            errors={errors}
                                            touched={touched}
                                            handleChangeForm={handleChange}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                </React.Fragment>
                            );
                        })}

                        <div className={'mt-3 flex justify-between items-center'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                    />
                                }
                                label={t('login_page.login_form.remember_me')}
                            />
                            <div className={'cursor-pointer'} onClick={redirectToForgetPassword}>
                            <Typography
                                    content={'login_page.forgot_password'}
                                    className={'text-base text-gray-500 underline hover:text-cyan-700 hover:no-underline'}
                                    dataTest={'navigate-to-forgot-pass'}
                                />
                            </div>
                        </div>

                        <div className={'mt-6'}>
                            <Button
                                content={'login_page.login_form.login_with_google'}
                                typoClassName={'text-gray-600 text-2xl'}
                                dataTest={'loginGoogleBtn'}
                                icon={<FcGoogle/>}
                                buttonClassName={'border border-gray-400 text-black'}
                                handleClick={() => handleLoginWithGoogle()}
                            />

                            <Button
                                buttonClassName={'mt-4 bg-gray-400'}
                                btnType={'submit'}
                                content={'login_page.login_form.submit_btn'}
                                typoClassName={'text-white text-2xl'}
                                dataTest={'loginBtn'}
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
                                    dataTest={'navigate-to-sign-up'}
                                />
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
}
