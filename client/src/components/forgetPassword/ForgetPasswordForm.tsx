import React, { useState } from 'react';
import Typography from '../base/Typography';
import Button from '../base/Button';
import services from '../../services';
import { HTTP_STATUS } from '@/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FieldProps } from '@/types/field';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import RenderFormField from '@/components/base/RenderFormField';
import { FORGET_RESET_CHANGE_PASSWORD } from '@/constants/auth';

export default function ForgetPasswordForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState<string>('');
    const [ isSendMailSuccessfully, setIsSendMailSuccessfully ] = useState<boolean>(false);

    const formForgetPasswordFieldArr: FieldProps[] = [
        {
            label: 'forget_password_page.forget_password_form.email.label',
            placeholder: 'login_page.login_form.email_placeholder',
            htmlFor: 'email',
            inputName: 'email',
            dataTest: 'email',
            errorMessageField: 'form.email_address',
            errorMessageDataTest: 'errorEmail'
        }
    ];

    const forgetPasswordValidationSchema = yup.object({
        email: yup
            .string()
            .required('error_messages.filed_required')
            .email('error_messages.wrong_email_validate'),
    });


    const handleSubmitEmailForgetPassword = async (values: any) => {
        dispatch(setShowLoadingIcon(true));
            const payload = {
                email: values.email,
                callbackUrl: `${window.location.origin}/reset-password`
            };
            try {
                const res = await services.forgetPassword(payload);
                if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                    setEmail(values.email);
                    setIsSendMailSuccessfully(true);
                    dispatch(setShowLoadingIcon(false));
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'forget_password_page.response_message.send_mail_success',
                        type: 'success'
                    }));
                }
            } catch (err: any) {
                console.log('err', err);
                const errorMessage = err.response?.data.message || '';
                dispatch(setShowLoadingIcon(false));
                dispatch(setShowToastMessage({
                        show: true,
                        message: `forget_password_page.response_message.${errorMessage === FORGET_RESET_CHANGE_PASSWORD.NOT_FOUND_EMAIL ? 'not_found_email' : 'send_mail_failed'}`,
                        type: 'error'
                }));
            }
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            {isSendMailSuccessfully
                ? (
                    <div data-test={'sendEmailSuccessContainer'}>
                        <Typography
                            content={'forget_password_page.send_email_success.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />

                        <div data-test={'sendEmailSuccessText'}>
                            <Typography
                                content={'forget_password_page.send_email_success.description'}
                                className={'mr-1 mb-1 text-lg'}
                                />
                            <Typography
                                content={`${email}`}
                                className={'font-bold mr-1 mb-1 text-xl'}
                                dataTest={'sendEmail'}
                                needTranslate={false}
                            />
                            <Typography
                                content={'forget_password_page.send_email_success.check_and_follow'}
                                className={'text-lg'}
                            />
                        </div>

                        <div className="my-3 flex items-center">
                            <Typography
                                content={'forget_password_page.not_receive_email'}
                                className={'text-base mr-1'}
                            />
                            <div onClick={() => setIsSendMailSuccessfully(false)} className={'cursor-pointer'}>
                                <Typography
                                content={'forget_password_page.forget_password_form.button_resend_label'}
                                className={'text-base text-gray-400 hover:underline'}
                                dataTest={'resendEmail'}
                            />
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div data-test={'sendEmailForm'}>
                        <Typography
                            content={'forget_password_page.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />

                        <div className={'mt-3'}>
                            <Formik
                                initialValues={{ email: '' }}
                                onSubmit={handleSubmitEmailForgetPassword}
                                validationSchema={forgetPasswordValidationSchema}
                            >
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
                                        {formForgetPasswordFieldArr.map((field: FieldProps) => (
                                            <React.Fragment key={field.inputName}>
                                                <RenderFormField
                                                    field={field}
                                                    formikValues={formikValues}
                                                    errors={errors}
                                                    touched={touched}
                                                    handleChangeForm={handleChange}
                                                    handleBlur={handleBlur}
                                                    setFieldValue={setFieldValue}
                                                />
                                            </React.Fragment>
                                        ))}

                                        <div className={'mt-6'}>
                                            <Button
                                                btnType={'submit'}
                                                content={'forget_password_page.forget_password_form.button_label'}
                                                typoClassName={'text-white text-xl'}
                                                dataTest={'sendEmailBtn'}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            <div
                                className={'mt-3 flex items-center justify-center gap-2 cursor-pointer text-gray-500 hover:text-cyan-700 hover:underline'}
                                onClick={() => navigate('/login')}
                                data-test={'goBackToLoginBtn'}
                            >
                                <div className={'text-xl'}>
                                    <MdOutlineKeyboardBackspace />
                                </div>

                                <Typography
                                    content={'forget_password_page.back_to_login'}
                                    className={'text-base'}
                                />
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}
