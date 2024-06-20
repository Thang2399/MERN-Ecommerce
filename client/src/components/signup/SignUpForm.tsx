import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import ErrorMessage from '../base/ErrorMessage';
import Button from '../base/Button';

import { setCookie } from 'typescript-cookie';
import services from '../../services';
import { setShowLoadingIcon, setShowToastMessage, setUserCommonInfor } from '../../store/common';
import { COMMON_CONSTANTS, HTTP_STATUS } from '../../constants';
import BaseRadioButtons from '../base/RadioButtons';
import DatePicker from '../base/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { defaultSignUpForm, defaultSignUpFormErrorMessages } from '../../form/signup';
import { defaultSignUpFormType, signUpFormErrorMessageTypes, signUpFormPayloadTypes } from '../../types/signup';
import { checkValidateSignUpForm } from '../../utils/signup';
import { USER_ROUTES } from '../../routes/constants';

const gendersOptions = [
    {
        label: 'signup_page.signup_form.gender.male',
        value: 'male'
    },
    {
        label: 'signup_page.signup_form.gender.female',
        value: 'female'
    },
    {
        label: 'signup_page.signup_form.gender.other',
        value: 'other'
    },
];
export default function SignUpForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ gender, setGender ] = useState<string>(gendersOptions[0].value);
    
    const [ signUpForm, setSignUpForm ] = useState<defaultSignUpFormType>(defaultSignUpForm);
    const [ signUpFormErrorMessages, setSignUpFormErrorMessages ] = useState<signUpFormErrorMessageTypes>(defaultSignUpFormErrorMessages);
    const [ dateOfBirth, setDateOfBirth ] = useState<Dayjs | string>(dayjs());

    const handleChangeSignUpForm = (e: any) => {
        let inputValue = e.target.value;

        if (e.target.name === 'phoneNumber') {
            inputValue = e.target.value.replace(/\D/g, '');
        }

        setSignUpForm({
            ...signUpForm,
            [e.target.name]: inputValue
        });
    };

    const redirectToLogin = () => {
        navigate(`${USER_ROUTES.LOGIN}`);
    };
    
    const handleChangeDate = (newValue: Dayjs | string) => {
        setDateOfBirth(newValue);
    };

    const handleSelectGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };

    const onSignUpUser = async (payload: signUpFormPayloadTypes) => {
        dispatch(setShowLoadingIcon(true));
        try {
            const res = await services.signUpUser(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS){
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
                    dispatch(setShowLoadingIcon(false));
                    navigate(USER_ROUTES.DEFAULT);
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'login_page.response_message.login_success',
                        type: 'success'
                    }));
                }

            }
        }
        catch (err: any) {
            console.log('error', err);
            dispatch(setShowLoadingIcon(false));
        }
    };

    const handleSignUp = (e: any) => {
        e.preventDefault();
        const formattedDate = dayjs(dateOfBirth).format('DD/MM/YYYY');
        const formPayload = {
            ...signUpForm,
            gender,
            dateOfBirth: formattedDate
        };
        const errorMessages = checkValidateSignUpForm(formPayload);
        setSignUpFormErrorMessages(errorMessages);

        let error = 0;
        let key: keyof signUpFormErrorMessageTypes;
        for (key in errorMessages) {
            if (errorMessages[key].message !== '') error ++;
        }

        if (error === 0) {
            onSignUpUser(formPayload);
        }
    };

    return (
        <div className={'w-full border p-5 rounded-md'}>
            <Typography
                content={'signup_page.label'}
                className={'text-3xl font-semibold mb-4'}
            />

            <form>
                {/*Username*/}
                <div className={''}>
                    <div className={''}>
                        <Typography
                            content={'signup_page.signup_form.first_name.label'}
                            className={'text-base mb-2'}
                        />
                        <InputTextField
                            handleChange={handleChangeSignUpForm}
                            placeholder={'signup_page.signup_form.first_name.placeholder'}
                            
                            value={signUpForm.userName}
                            inputName={'userName'}
                            className={'border mb-1'}
                            isInvalidField={!!signUpFormErrorMessages.userName.message}
                            dataTest={'userName'}
                        />
                        <ErrorMessage
                            errorMessage={signUpFormErrorMessages.userName.message}
                            field={signUpFormErrorMessages.userName.field}
                            dataTest={'userNameErrMessage'}
                        />
                    </div>

                </div>

                {/*Email */}
                <div className={'mt-2 flex'}>
                    <div className={'w-1/2 mr-4'}>
                        <Typography
                        content={'signup_page.signup_form.email.label'}
                        className={'text-base mb-2'}
                    />
                    <InputTextField
                        handleChange={handleChangeSignUpForm}
                        placeholder={'signup_page.signup_form.email.placeholder'}
                        
                        value={signUpForm.email}
                        inputName={'email'}
                        className={'border mb-1'}
                        isInvalidField={!!signUpFormErrorMessages.email.message}
                        dataTest={'email'}
                    />
                    <ErrorMessage
                        errorMessage={signUpFormErrorMessages.email.message}
                        field={signUpFormErrorMessages.email.field}
                        dataTest={'emailErrMessage'}
                    />
                    </div>

                    {/* Phone number*/}
                    <div className={'w-1/2'}>
                        <Typography
                            content={'signup_page.signup_form.phone_number.label'}
                            className={'text-base mb-2'}
                        />
                        <InputTextField
                            handleChange={handleChangeSignUpForm}
                            placeholder={'signup_page.signup_form.phone_number.placeholder'}
                            
                            value={signUpForm.phoneNumber}
                            inputName={'phoneNumber'}
                            className={'border mb-1'}
                            isInvalidField={!!signUpFormErrorMessages.phoneNumber.message}
                            dataTest={'phoneNumber'}
                        />
                        <ErrorMessage
                            errorMessage={signUpFormErrorMessages.phoneNumber.message}
                            field={signUpFormErrorMessages.phoneNumber.field}
                            dataTest={'phoneNumberErrMessage'}
                        />
                    </div>
                </div>

                {/*Password */}
                <div className={'mt-2'}>
                    <Typography
                        content={'signup_page.signup_form.password.label'}
                        className={'text-base mb-2'}
                    />
                    <InputTextField
                        handleChange={handleChangeSignUpForm}
                        placeholder={'signup_page.signup_form.password.placeholder'}
                        
                        value={signUpForm.password}
                        inputName={'password'}
                        className={'border mb-1'}
                        isPasswordField={true}
                        isInvalidField={!!signUpFormErrorMessages.password.message}
                        dataTest={'password'}
                    />
                    <ErrorMessage
                        errorMessage={signUpFormErrorMessages.password.message}
                        field={signUpFormErrorMessages.password.field}
                        dataTest={'passwordErrMessage'}
                    />
                </div>

                {/*Repeat password*/}
                <div className={'mt-2'}>
                    <Typography
                        content={'signup_page.signup_form.repeat_password.label'}
                        className={'text-base mb-2'}
                    />
                    <InputTextField
                        handleChange={handleChangeSignUpForm}
                        placeholder={'signup_page.signup_form.repeat_password.placeholder'}
                        
                        value={signUpForm.confirmPassword}
                        inputName={'confirmPassword'}
                        className={'border mb-1'}
                        isPasswordField={true}
                        isInvalidField={!!signUpFormErrorMessages.confirmPassword.message}
                        dataTest={'confirmPassword'}
                    />
                    <ErrorMessage
                        errorMessage={signUpFormErrorMessages.confirmPassword.message}
                        field={signUpFormErrorMessages.confirmPassword.field}
                        dataTest={'confirmPasswordErrMessage'}
                    />
                </div>
                
                <div className={'mt-4 bg-gray-300 rounded p-4'}>
                    <Typography content={'signup_page.signup_form.password_validate.label'} className={'text-base'}/>
                </div>

                {/*Gender*/}
                <div className={'mt-2 flex w-full'}>
                    <div className={'w-1/2'}>
                        <Typography
                            content={'signup_page.signup_form.gender.label'}
                            className={'text-base mb-2'}
                        />
                        <BaseRadioButtons
                            isRow={true}
                            optionsList={gendersOptions}
                            defaultValue={gender}
                            handleSelect={handleSelectGender}
                        />
                    </div>

                    <div className={'w-1/2'}>
                        <Typography
                            content={'signup_page.signup_form.date_of_birth.label'}
                            className={'text-base mb-2'}
                        />
                        <DatePicker 
                            selectedDay={dateOfBirth} 
                            handleChangeDate={handleChangeDate}
                        />
                    </div>
                </div>

                <div className={'mt-6'}>
                    <Button
                        handleClick={handleSignUp}
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
            </form>
        </div>
    );
}
