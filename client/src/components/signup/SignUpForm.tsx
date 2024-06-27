import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from '../base/Typography';
import Button from '../base/Button';

import { setCookie } from 'typescript-cookie';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { COMMON_CONSTANTS, HTTP_STATUS, REGEX } from '@/constants';
import { defaultSignUpForm } from '@/form/signup';
import { defaultSignUpFormType, signUpFormPayloadTypes } from '@/types/signup';
import { USER_ROUTES } from '@/routes/constants';
import { gendersOptions } from '@/constants/user';
import { FieldProps } from '@/types/field';
import { FIELD_TYPE } from '@/constants/field';
import { Form, Formik, FormikErrors } from 'formik';
import { formatDateTime } from '@/utils/misc';
import RenderFormField from '@/components/base/RenderFormField';
import { FcGoogle } from 'react-icons/fc';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function SignUpForm(): JSX.Element {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ signUpForm, setSignUpForm ] = useState<defaultSignUpFormType>(defaultSignUpForm);

    const formFieldsUsernameArr: FieldProps[] = [
        {
            label: 'signup_page.signup_form.first_name.label',
            htmlFor: 'userName',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'signup_page.signup_form.first_name.placeholder',
            inputName: 'userName',
            dataTest: 'userName',
            errorMessageField: 'form.user_name',
            errorMessageDataTest: 'errorUserName'
        },
        {
            label: 'signup_page.signup_form.email.label',
            htmlFor: 'email',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'signup_page.signup_form.email.placeholder',
            inputName: 'email',
            dataTest: 'email',
            errorMessageField: 'form.email_address',
            errorMessageDataTest: 'errorEmail'
        },
        {
            label: 'signup_page.signup_form.phone_number.label',
            htmlFor: 'phoneNumber',
            fieldType: FIELD_TYPE.INPUT,
            placeholder: 'signup_page.signup_form.phone_number.placeholder',
            inputName: 'phoneNumber',
            dataTest: 'phoneNumber',
            errorMessageField: 'form.phone_number',
            errorMessageDataTest: 'errorPhoneNumber',
            isPhoneNumberInput: true
        },
    ];

    const formPasswordFieldsArr: FieldProps[] = [
        {
            label: 'signup_page.signup_form.password.label',
            htmlFor: 'password',
            fieldType: FIELD_TYPE.PASSWORD,
            placeholder: 'signup_page.signup_form.password.placeholder',
            inputName: 'password',
            dataTest: 'password',
            errorMessageField: 'form.password',
            errorMessageDataTest: 'errorPassword'
        },
        {
            label: 'signup_page.signup_form.repeat_password.label',
            htmlFor: 'confirmPassword',
            fieldType: FIELD_TYPE.PASSWORD,
            placeholder: 'signup_page.signup_form.repeat_password.placeholder',
            inputName: 'confirmPassword',
            dataTest: 'confirmPassword',
            errorMessageField: 'form.confirm_password',
            errorMessageDataTest: 'errorConfirmPassword'
        },
    ];

    const formGenderDateFieldsArr: FieldProps[] = [
        {
            label: 'signup_page.signup_form.gender.label',
            htmlFor: 'gender',
            fieldType: FIELD_TYPE.RADIO,
            placeholder: '',
            inputName: 'gender',
            dataTest: 'gender',
            errorMessageField: 'form.gender',
            errorMessageDataTest: 'errorGender',
            checkboxList: gendersOptions,
            isRowRadio: true,
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                setFieldValue('gender', value);
            }
        },
        {
            label: 'signup_page.signup_form.date_of_birth.label',
            htmlFor: 'dateOfBirth',
            fieldType: FIELD_TYPE.CALENDAR,
            placeholder: '',
            inputName: 'dateOfBirth',
            dataTest: 'dateOfBirth',
            errorMessageField: 'form.date_of_birth',
            errorMessageDataTest: 'errorDateOfBirth',
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                const convertDate = formatDateTime(value);
                setFieldValue('dateOfBirth', convertDate);
            }
        },
    ];

    const signUpValidationSchema = yup.object({
        userName: yup.string().required('error_messages.filed_required'),
        email: yup
            .string()
            .required('error_messages.filed_required')
            .email('error_messages.wrong_email_validate'),
        phoneNumber: yup.string().required('error_messages.filed_required'),
        password: yup.string()
            .min(8,  t('error_messages.not_enough_length', { min: '8' }))
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_NUMBER, 'error_messages.contain_at_least_one_number')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_LETTER, 'error_messages.contain_at_least_one_letter')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER, 'error_messages.contain_at_least_one_special_character')
            .required('error_messages.filed_required'),
        confirmPassword: yup.string().equals([ yup.ref('password') ], 'Password must match').required('error_messages.filed_required'),
        dateOfBirth: yup.string().required('error_messages.filed_required'),
    });

    const redirectToLogin = () => {
        navigate(`${USER_ROUTES.LOGIN}`);
    };

    const onSignUpUser = async (payload: signUpFormPayloadTypes) => {
        dispatch(setShowLoadingIcon(true));
        try {
            const res = await services.signUpUser(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                console.log('res', res);
                const loginPayload = {
                    email: payload.email,
                    password: payload.password,
                    remember: false,
                };
                const loginRes = await services.loginUser(loginPayload);

                if (loginRes && loginRes.status === HTTP_STATUS.CREATE_SUCCESS) {
                    const data = loginRes.data;
                    setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, data.accessToken);
                    localStorage.setItem(COMMON_CONSTANTS.REFRESH_TOKEN, data.refreshToken);
                    dispatch(setShowLoadingIcon(false));
                    navigate(USER_ROUTES.DEFAULT);
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'login_page.response_message.login_success',
                        type: 'success'
                    }));
                }

            }
        } catch (err: any) {
            console.log('error', err);
            dispatch(setShowLoadingIcon(false));
        }
    };

    const handleSignUp = (values: any) => {
        onSignUpUser(values);
    };

    const handleLoginWithGoogle = () => {
        const newPath = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        const redirectRoute = `${process.env.REACT_APP_SERVER_END_POINT}/auth/google/redirect?redirect_url=${newPath}`;
        window.location.href = redirectRoute;
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            <Typography
                content={'signup_page.label'}
                className={'text-3xl font-semibold mb-4'}
            />

            <div className={'my-6'}>
                <Button
                    content={'login_page.login_form.login_with_google'}
                    typoClassName={'text-gray-600 text-2xl'}
                    dataTest={'loginGoogleBtn'}
                    icon={<FcGoogle/>}
                    buttonClassName={'border border-gray-400 text-black'}
                    handleClick={() => handleLoginWithGoogle()}
                />
            </div>

            <div className={'flex items-center justify-between gap-1'}>
                <div className={'w-2/5 h-0.5 bg-gray-200'}/>
                <Typography content={'signup_page.or'}/>
                <div className={'w-2/5 h-0.5 bg-gray-200'}/>
            </div>

            <Formik
                initialValues={defaultSignUpForm}
                onSubmit={handleSignUp}
                validationSchema={signUpValidationSchema}
            >
                {({ values: formikValues, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {formFieldsUsernameArr.map((field: FieldProps) => {
                                return (
                                    <div className={`${field.inputName === 'userName' ? 'col-span-2' : ''}`}>
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
                                );
                            })}
                        </div>

                        <div>
                            {formPasswordFieldsArr.map((field: FieldProps) => {
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
                            <div className={'mt-4 bg-gray-300 rounded p-4'}>
                                <Typography
                                    content={'signup_page.signup_form.password_validate.label'}
                                    className={'text-lg'}/>
                            </div>
                        </div>

                        <div className={'grid grid-cols-2 gap-4'}>
                            {formGenderDateFieldsArr.map((field: FieldProps) => {
                                return (
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
                                );
                            })}
                        </div>

                        <div className={'mt-6'}>
                            <Button
                                btnType={'submit'}
                                content={'signup_page.signup_form.submit_btn'}
                                typoClassName={'text-white text-2xl'}
                                dataTest={'sign-up-btn'}
                            />
                        </div>

                        <div className={'flex mt-4'}>
                            <Typography
                                content={'signup_page.already_have_account'}
                                className={'mr-1 text-base'}
                            />
                            <div className={'cursor-pointer'} onClick={redirectToLogin}>
                                <Typography
                                    content={'signup_page.login_now'}
                                    className={'text-base text-gray-500 underline hover:text-cyan-700 hover:no-underline'}
                                    dataTest={'navigate-to-login'}
                                />
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    );
}
