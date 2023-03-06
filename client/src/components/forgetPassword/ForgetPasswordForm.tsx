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
import { setShowLoadingIcon } from '../../store/common';

export default function ForgetPasswordForm(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState<string>('');
    const [ forgetPasswordEmailErrorMessage, setForgetPasswordEmailErrorMessage ] = useState<string>('');

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
            const payload = { email };
            try {
                const res = await services.forgetPassword(payload);
                if (res && res.status === HTTP_STATUS.SUCCESS) {
                    dispatch(setForgetPasswordEmail(email));
                    dispatch(setShowLoadingIcon(false));
                    navigate('/reset-password');
                }
            } catch (err: any) {
                console.log('err', err);
                dispatch(setShowLoadingIcon(false));
            }

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
                        />
                        <ErrorMessage
                            errorMessage={forgetPasswordEmailErrorMessage}
                            field={'form.email_address'}
                        />
                    </div>

                    <div className={'mt-3'}>
                        <Button
                            handleClick={handleSubmitEmailForgetPassword}
                            content={'forget_password_page.forget_password_form.button_label'}
                            typoClassName={'text-white text-2xl'}
                        />
                    </div>
                </form>

            </div>
        </div>
    );
}
