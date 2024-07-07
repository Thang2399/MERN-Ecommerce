import React, { useState } from 'react';
import Typography from '../base/Typography';
import Button from '../base/Button';
import { IResetPasswordFormPayload } from '@/types/resetPassword';
import { defaultResetPasswordForm } from '@/form/resetPassword';
import { useDispatch } from 'react-redux';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { HTTP_RESPONSE_MESSAGE, HTTP_STATUS, REGEX } from '@/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FieldProps } from '@/types/field';
import { FIELD_TYPE } from '@/constants/field';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import RenderFormField from '@/components/base/RenderFormField';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { USER_ROUTES } from '@/routes/constants';

const ResetPasswordForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isTokenExpired, setIsTokenExpired ] = useState<boolean>(false);

    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');

    const formResetPasswordFieldsArr: FieldProps[] = [
        {
            label: 'reset_password_page.reset_password_form.new_password.label',
            htmlFor: 'newPassword',
            inputName: 'newPassword',
            fieldType: FIELD_TYPE.PASSWORD,
            placeholder: 'reset_password_page.reset_password_form.new_password.placeholder',
            dataTest: 'newPassword',
            errorMessageField: 'form.new_password',
            errorMessageDataTest: 'errNewPassword'
        },
        {
            label: 'reset_password_page.reset_password_form.confirm_password.label',
            htmlFor: 'confirmPassword',
            inputName: 'confirmPassword',
            fieldType: FIELD_TYPE.PASSWORD,
            placeholder: 'reset_password_page.reset_password_form.confirm_password.placeholder',
            dataTest: 'confirmPassword',
            errorMessageField: 'form.confirm_password',
            errorMessageDataTest: 'errConfirmPassword'
        }
    ];

    const resetPasswordValidationSchema = yup.object().shape({
        newPassword: yup.string()
            .min(8, t('error_messages.not_enough_length', { min: '8' }))
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_NUMBER, 'error_messages.contain_at_least_one_number')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_LETTER, 'error_messages.contain_at_least_one_letter')
            .matches(REGEX.CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER, 'error_messages.contain_at_least_one_special_character')
            .required('error_messages.filed_required'),
        confirmPassword: yup.string().equals([ yup.ref('newPassword') ], 'Password must match').required('error_messages.filed_required'),
    });

    const onResetPassword = async (payload: IResetPasswordFormPayload) => {
        if (token) {
            dispatch(setShowLoadingIcon(true));
            try {
                const res = await services.resetPassword(payload);
                if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                    dispatch(setShowLoadingIcon(false));
                    navigate('/login');
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'reset_password_page.response_message.reset_success',
                        type: 'success'
                    }));
                }
            } catch (err: any) {
                const errorMessage = err.response.data.message;
                if (errorMessage === HTTP_RESPONSE_MESSAGE.FORGET_RESET_CHANGE_PASSWORD.TOKEN_IS_INVALID) {
                    setIsTokenExpired(true);
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'reset_password_page.response_message.wrong_otp',
                        type: 'error'
                    }));
                } else {
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'reset_password_page.response_message.reset_failed',
                        type: 'error'
                    }));
                }
                dispatch(setShowLoadingIcon(false));
            }
        }
    };

    const handleSubmitResetPassword = (values: any) => {
        const payload = {
            token: token || '',
            newPassword: values.newPassword
        };
        onResetPassword(payload);
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            {!isTokenExpired
                ? (
                    <div data-test={'resetPasswordForm'}>
                        <Typography
                            content={'forget_password_page.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />

                        <div className={'mt-3'}>
                            <Formik
                                initialValues={defaultResetPasswordForm}
                                onSubmit={handleSubmitResetPassword}
                                validationSchema={resetPasswordValidationSchema}>
                                {({
                                      values: formikValues,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      setFieldValue
                                  }) => (
                                    <Form onSubmit={handleSubmit}>
                                        {formResetPasswordFieldsArr.map((field: FieldProps) => (
                                            <div className={'mt-3'} key={field.inputName}>
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
                                        ))}

                                        <div className={'mt-4 bg-gray-300 rounded p-4'}>
                                            <Typography content={'signup_page.signup_form.password_validate.label'}
                                                        className={'text-base'}/>
                                        </div>

                                        <div className={'mt-5'}>
                                            <Button
                                                btnType={'submit'}
                                                content={'reset_password_page.reset_password_form.button_label'}
                                                typoClassName={'text-white text-xl'}
                                                dataTest={'resetPasswordBtn'}
                                            />
                                        </div>
                                    </Form>
                                )}

                            </Formik>
                        </div>
                    </div>
                )
                : (
                    <div data-test={'tokenExpiredContainer'}>
                        <Typography
                            content={'reset_password_page.token_expired.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />

                            <Typography
                                content={'reset_password_page.token_expired.description'}
                                className={'text-xl mb-4'}
                            />

                        <div
                            className={'mt-3 flex items-center justify-center gap-2 cursor-pointer text-gray-500 hover:text-cyan-700 hover:underline'}
                            onClick={() => navigate(USER_ROUTES.FORGET_PASSWORD
                            )}
                            data-test={'goBackToForgetPasswordBtn'}
                        >
                            <div className={'text-xl'}>
                                <MdOutlineKeyboardBackspace/>
                            </div>

                            <Typography
                                content={'reset_password_page.token_expired.back_to_forget_password'}
                                className={'text-base'}
                            />
                        </div>
                    </div>
                )
            }

        </div>

    );
};

export default ResetPasswordForm;
