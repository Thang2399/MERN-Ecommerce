import React, { useState } from 'react';
import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import ErrorMessage from '../base/ErrorMessage';
import Button from '../base/Button';
import { checkEmailAddress } from '../../utils/misc';
import services from '../../services';
import { HTTP_STATUS } from '../../constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setForgetPasswordEmail } from '../../store/forgetPassword';
import { setShowLoadingIcon, setShowToastMessage } from '../../store/common';
import { useTranslation } from 'react-i18next';

export default function ForgetPasswordForm(): JSX.Element {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [ email, setEmail ] = useState<string>('');
    const [ forgetPasswordEmailErrorMessage, setForgetPasswordEmailErrorMessage ] = useState<string>('');
    const [ isSendMailSuccessfully, setIsSendMailSuccessfully ] = useState<boolean>(false);

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
    };

    const handleSubmitEmailForgetPassword = async (e: any) => {
        e.preventDefault();
        const errorMessage = checkEmailAddress(email, 'form.email_address');
        setForgetPasswordEmailErrorMessage(errorMessage.message);

        if (!errorMessage.message) {
            dispatch(setShowLoadingIcon(true));
            const payload = {
                email,
                callbackUrl: `${window.location.origin}/reset-password`
            };
            try {
                const res = await services.forgetPassword(payload);
                if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
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
                dispatch(setShowLoadingIcon(false));
                dispatch(setShowToastMessage({
                        show: true,
                        message: 'forget_password_page.response_message.send_mail_failed',
                        type: 'error'
                }));
            }
        }
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            {isSendMailSuccessfully
                ? (
                    <div>
                        <Typography
                            content={'forget_password_page.send_email_success.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />
                        <Typography content={t('forget_password_page.send_email_success.description', { email: email })} dataTest={'send-email-success-text'}/>

                        <div className="my-3 flex items-center">
                            <Typography
                                content={'forget_password_page.not_receive_email'}
                                className={'text-sm mr-1'}
                            />
                            <div onClick={() => setIsSendMailSuccessfully(false)} className={'cursor-pointer'}>
                                <Typography
                                content={'forget_password_page.forget_password_form.button_resend_label'}
                                className={'text-sm text-gray-400 hover:underline'}
                                dataTest={'resendEmail'}
                            />
                            </div>
                        </div>
                    </div>
                )
                : (
                    <>
                        <Typography
                            content={'forget_password_page.label'}
                            className={'text-3xl font-semibold mb-4'}
                        />

                        <div className={'mt-3'}>
                            <form>
                                <div>
                                    <Typography
                                        content={'forget_password_page.forget_password_form.email.label'}
                                        className={'text-base mb-2'}
                                    />
                                    <InputTextField
                                        handleChange={handleChangeEmail}
                                        placeholder={'login_page.login_form.email_placeholder'}
                                        type={'email'}
                                        value={email}
                                        inputName={'email'}
                                        className={'border mb-1'}
                                        isInvalidField={!!forgetPasswordEmailErrorMessage}
                                        dataTest={'email'}
                                    />
                                    <ErrorMessage
                                        errorMessage={forgetPasswordEmailErrorMessage}
                                        field={'form.email_address'}
                                        dataTest={'emailErrMessage'}
                                    />
                                </div>

                                <div className={'mt-3'}>
                                    <Button
                                        handleClick={handleSubmitEmailForgetPassword}
                                        content={'forget_password_page.forget_password_form.button_label'}
                                        typoClassName={'text-white text-2xl'}
                                        dataTest={'forgetPasswordBtn'}
                                    />
                                </div>
                            </form>

                        </div>
                    </>
                )
            }

        </div>
    );
}
