import React, { Dispatch, SetStateAction } from 'react';

import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import ErrorMessage from '../base/ErrorMessage';

import {
    userAddress,
    userAddressFormErrorMessages,
    userInforFormErrorMessages,
    userInformation
} from '../../types';

interface Props {
    userInforForm: userInformation,
    setUserInforForm: Dispatch<SetStateAction<userInformation>>,
    activeStep: number,
    errorMessageUserInforForm: userInforFormErrorMessages,
    userAddressInforForm: userAddress,
    setUserAddressInforForm: Dispatch<SetStateAction<userAddress>>,
    errorMessageUserAddressForm: userAddressFormErrorMessages
}

const CartUserInfoForm: React.FC<Props> = ({
    userInforForm,
    setUserInforForm,
    activeStep,
    errorMessageUserInforForm,
    userAddressInforForm,
    setUserAddressInforForm,
    errorMessageUserAddressForm
}) => {
    
    const handleChangeUserInfor = (e: any) => {
        let inputValue = e.target.value;
        if (e.target.name === 'phoneNumber') {
            inputValue = e.target.value.replace(/\D/g, '');
        }
        setUserInforForm({
            ...userInforForm,
            [e.target.name]: inputValue
        });

    };

    return (
        <div>
            <form>
                {activeStep === 0 && (
                    <>
                        <Typography
                            content={'cart_page.checkout_form.customer_information'}
                            className={'text-xl font-semibold'}
                            variant={'h-4'}
                        />

                        <div>
                            <Typography
                                content={'cart_page.checkout_form.first_name'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.firstName}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'firstName'}
                                placeholder={'cart_page.checkout_form.first_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.firstName.message}
                                field={errorMessageUserInforForm.firstName.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.last_name'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.lastName}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'lastName'}
                                placeholder={'cart_page.checkout_form.last_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.lastName.message}
                                field={errorMessageUserInforForm.lastName.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.phone_number'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.phoneNumber}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'phoneNumber'}
                                placeholder={'cart_page.checkout_form.phone_number'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.phoneNumber.message}
                                field={errorMessageUserInforForm.phoneNumber.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.email_address'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.emailAddress}
                                handleChange={handleChangeUserInfor}
                                type={'email'}
                                inputName={'emailAddress'}
                                placeholder={'cart_page.checkout_form.email_address'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.emailAddress.message}
                                field={errorMessageUserInforForm.emailAddress.field}
                            />
                        </div>

                    </>


                )}

                {activeStep === 1 && (
                    <>
                        <Typography
                            content={'cart_page.checkout_form.address'}
                            className={'text-xl font-semibold'}
                            variant={'h-4'}
                        />

                        <div>
                            <Typography
                                content={'cart_page.checkout_form.country'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.country}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'country'}
                                placeholder={'cart_page.checkout_form.first_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.country.message}
                                field={errorMessageUserAddressForm.country.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.city'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.city}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'city'}
                                placeholder={'cart_page.checkout_form.last_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.lastName.message}
                                field={errorMessageUserInforForm.lastName.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.phone_number'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.phoneNumber}
                                handleChange={handleChange}
                                type={'text'}
                                inputName={'phoneNumber'}
                                placeholder={'cart_page.checkout_form.phone_number'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.phoneNumber.message}
                                field={errorMessageUserInforForm.phoneNumber.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.email_address'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.emailAddress}
                                handleChange={handleChange}
                                type={'email'}
                                inputName={'emailAddress'}
                                placeholder={'cart_page.checkout_form.email_address'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.emailAddress.message}
                                field={errorMessageUserInforForm.emailAddress.field}
                            />
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default CartUserInfoForm;

