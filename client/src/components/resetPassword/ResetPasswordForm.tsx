import React, { useState } from 'react';
import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import ErrorMessage from '../base/ErrorMessage';
import Button from '../base/Button';
import { IResetPasswordErrorMessages, IResetPasswordForm } from '../../types/resetPassword';
import { defaultForgetPasswordErrorMessage, defaultForgetPasswordForm } from '../../form/resetPassword';
import { checkValidateResetPasswordForm } from '../../utils/resetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage } from '../../store/common';
import {HTTP_RESPONSE_MESSAGE, HTTP_STATUS} from '../../constants';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forgetPasswordEmail = useSelector((state: RootState) => state.forgetPasswordReducer.forgetPasswordEmail);
    const [ resetPasswordForm, setResetPassword ] = useState<IResetPasswordForm>(defaultForgetPasswordForm);
    const [ resetPasswordErrorMessages, setResetPasswordErrorMessages ] = useState<IResetPasswordErrorMessages>(defaultForgetPasswordErrorMessage);

    const handleChangeResetPasswordForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;
        if (event.target.name === 'otp') {
            inputValue = event.target.value.replace(/\D/g, '');
        }
        setResetPassword({
            ...resetPasswordForm,
            [event.target.name]: inputValue
        });
    };

    const onResetPassword = async (formData: IResetPasswordForm) => {
        dispatch(setShowLoadingIcon(true));
        try {
            const payload = {
                otp: formData.otp,
                email: forgetPasswordEmail,
                newPassword: formData.newPassword
            };

            const res = await services.resetPassword(payload);
            if (res && res.status === HTTP_STATUS.SUCCESS) {
                dispatch(setShowLoadingIcon(false));
                 navigate('/login');
                 dispatch(setShowToastMessage({
                    show: true,
                    message: 'reset_password_page.response_message.reset_success',
                    type: 'success'
                }));
            }
        } catch (err: any) {
            console.log(err);
            console.log(err.response.data.message);
            const errorMessage = err.response.data.message;
            if (errorMessage === HTTP_RESPONSE_MESSAGE.FORGET_RESET_PASSWORD.WRONG_OTP) {
                dispatch(setShowToastMessage({
                    show: true,
                    message: 'reset_password_page.response_message.wrong_otp',
                    type: 'error'
                }));
            }
            dispatch(setShowLoadingIcon(false));
        }
    };

    const handleSubmitResetPassword = (e: any) => {
        e.preventDefault();
        const errorsMessages = checkValidateResetPasswordForm(resetPasswordForm);
        setResetPasswordErrorMessages({
            ...resetPasswordForm,
            ...errorsMessages
        });

        let error = 0;
        let key: keyof IResetPasswordErrorMessages;
        for (key in errorsMessages) {
            if (errorsMessages[key].message !== '') error ++;
        }

        if (error === 0) {
            onResetPassword(resetPasswordForm);
        }
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            <Typography
                content={'forget_password_page.label'}
                className={'text-3xl font-semibold mb-4'}
            />

            <div className={'mt-3'}>
                <form>
                    <div>
                        <Typography
                            content={'reset_password_page.reset_password_form.otp.label'}
                            className={'text-base mb-2'}
                        />
                        <InputTextField
                            handleChange={handleChangeResetPasswordForm}
                            placeholder={'reset_password_page.reset_password_form.otp.placeholder'}
                            type={'text'}
                            value={resetPasswordForm.otp}
                            inputName={'otp'}
                            className={'border mb-1'}
                            maxLength={6}
                        />
                        <ErrorMessage
                            errorMessage={resetPasswordErrorMessages.otp.message}
                            field={resetPasswordErrorMessages.otp.field}
                        />
                    </div>

                    <div className={'mt-2'}>
                        <Typography
                            content={'reset_password_page.reset_password_form.new_password.label'}
                            className={'text-base mb-2'}
                        />
                        <InputTextField
                            handleChange={handleChangeResetPasswordForm}
                            placeholder={'reset_password_page.reset_password_form.new_password.placeholder'}
                            type={'password'}
                            value={resetPasswordForm.newPassword}
                            inputName={'newPassword'}
                            className={'border mb-1'}
                            isPasswordField={true}
                        />
                        <ErrorMessage
                            errorMessage={resetPasswordErrorMessages.newPassword.message}
                            field={resetPasswordErrorMessages.newPassword.field}
                        />
                    </div>

                    <div className={'mt-2'}>
                        <Typography
                            content={'reset_password_page.reset_password_form.confirm_password.label'}
                            className={'text-base mb-2'}
                        />
                        <InputTextField
                            handleChange={handleChangeResetPasswordForm}
                            placeholder={'reset_password_page.reset_password_form.confirm_password.placeholder'}
                            type={'password'}
                            value={resetPasswordForm.confirmPassword}
                            inputName={'confirmPassword'}
                            className={'border mb-1'}
                            isPasswordField={true}
                        />
                        <ErrorMessage
                            errorMessage={resetPasswordErrorMessages.confirmPassword.message}
                            field={resetPasswordErrorMessages.confirmPassword.field}
                        />
                    </div>

                    <div className={'mt-4 bg-gray-300 rounded p-4'}>
                        <Typography content={'signup_page.signup_form.password_validate.label'} className={'text-base'}/>
                    </div>

                    <div className={'mt-5'}>
                        <Button
                            handleClick={handleSubmitResetPassword}
                            content={'reset_password_page.reset_password_form.button_label'}
                            typoClassName={'text-white text-2xl'}
                        />
                    </div>
                </form>

            </div>
        </div>

    );
};

export default ResetPasswordForm;