import React, { Dispatch, SetStateAction } from 'react';

import Typography from '../base/Typography';
import InputTextField from '../base/InputTextField';
import ErrorMessage from '../base/ErrorMessage';

import {
    userAddress,
    userAddressFormErrorMessages,
    userInforFormErrorMessages,
    userInformation, userPaymentFormType
} from '../../types/cart';
import BaseRadioButtons from '../base/RadioButtons';

interface Props {
    activeStep: number,
    userInforForm: userInformation,
    setUserInforForm: Dispatch<SetStateAction<userInformation>>,
    errorMessageUserInforForm: userInforFormErrorMessages,
    userAddressInforForm: userAddress,
    setUserAddressInforForm: Dispatch<SetStateAction<userAddress>>,
    errorMessageUserAddressForm: userAddressFormErrorMessages,
    userPaymentInforForm: userPaymentFormType,
    setUserPaymentInforForm: Dispatch<SetStateAction<userPaymentFormType>>
    optionsListShippingMethod: { label: string, value: string }[],
    optionsListPaymentMethod: { label: string, value: string }[],
    selectedShippingOptionValue: string,
    setSelectedShippingOptionValue: Dispatch<SetStateAction<string>>,
    selectedPaymentOptionValue: string,
    setSelectedPaymentOptionValue: Dispatch<SetStateAction<string>>
}

const CartUserInfoForm: React.FC<Props> = ({
    userInforForm,
    setUserInforForm,
    activeStep,
    errorMessageUserInforForm,
    userAddressInforForm,
    setUserAddressInforForm,
    errorMessageUserAddressForm,
    userPaymentInforForm,
    setUserPaymentInforForm,
    optionsListShippingMethod,
    optionsListPaymentMethod,
    selectedShippingOptionValue,
    setSelectedShippingOptionValue,
    selectedPaymentOptionValue,
    setSelectedPaymentOptionValue
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

    const handleChangeUserAddress = (e: any) => {
        const inputValue = e.target.value;
        setUserAddressInforForm({
            ...userAddressInforForm,
            [e.target.name]: inputValue
        });
    };

    const handleChangeUserPayment = (e: any) => {
        const inputValue = e.target.value;
        setUserPaymentInforForm({
            ...userPaymentInforForm,
            [e.target.name]: inputValue
        });
    };

    const handleSelectShippingOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedShippingOptionValue((event.target as HTMLInputElement).value);
    };

    const handleSelectPaymentOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentOptionValue((event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <form>
                {activeStep === 0 && (
                    <>
                        <Typography
                            content={'cart_page.checkout_form.customer_information.label'}
                            className={'text-2xl font-semibold mb-2'}
                            variant={'h4'}
                        />

                        {/*First Name*/}
                        <div>
                            <Typography
                                content={'cart_page.checkout_form.customer_information.first_name'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.firstName}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'firstName'}
                                placeholder={'cart_page.checkout_form.customer_information.first_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.firstName.message}
                                field={errorMessageUserInforForm.firstName.field}
                            />
                        </div>

                        {/*Last name*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.customer_information.last_name'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.lastName}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'lastName'}
                                placeholder={'cart_page.checkout_form.customer_information.last_name_placeholder'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.lastName.message}
                                field={errorMessageUserInforForm.lastName.field}
                            />
                        </div>

                        {/*Phone number*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.customer_information.phone_number'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.phoneNumber}
                                handleChange={handleChangeUserInfor}
                                type={'text'}
                                inputName={'phoneNumber'}
                                placeholder={'cart_page.checkout_form.customer_information.phone_number'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserInforForm.phoneNumber.message}
                                field={errorMessageUserInforForm.phoneNumber.field}
                            />
                        </div>

                        {/*Email*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.customer_information.email_address'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userInforForm.emailAddress}
                                handleChange={handleChangeUserInfor}
                                type={'email'}
                                inputName={'emailAddress'}
                                placeholder={'cart_page.checkout_form.customer_information.email_address'}
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
                            content={'cart_page.checkout_form.address.label'}
                            className={'text-2xl font-semibold mb-2'}
                            variant={'h4'}
                        />

                        {/*Country*/}
                        <div>
                            <Typography
                                content={'cart_page.checkout_form.address.country'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.country}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'country'}
                                placeholder={'cart_page.checkout_form.address.country'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.country.message}
                                field={errorMessageUserAddressForm.country.field}
                            />
                        </div>

                        {/*City*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.address.city'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.city}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'city'}
                                placeholder={'cart_page.checkout_form.address.city'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.city.message}
                                field={errorMessageUserAddressForm.city.field}
                            />
                        </div>

                        {/*District*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.address.district'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.district}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'district'}
                                placeholder={'cart_page.checkout_form.address.district'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.district.message}
                                field={errorMessageUserAddressForm.district.field}
                            />
                        </div>

                        {/*Street address*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.address.street_address'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userAddressInforForm.streetAddress}
                                handleChange={handleChangeUserAddress}
                                type={'text'}
                                inputName={'streetAddress'}
                                placeholder={'cart_page.checkout_form.address.street_address'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.streetAddress.message}
                                field={errorMessageUserAddressForm.streetAddress.field}
                            />
                        </div>
                    </>
                )}

                {activeStep === 2 && (
                    <>
                        <Typography
                            content={'cart_page.checkout_form.shipping_method.label'}
                            className={'text-2xl font-semibold mb-2'}
                            variant={'h4'}
                        />

                        <BaseRadioButtons
                            optionsList={optionsListShippingMethod}
                            defaultValue={selectedShippingOptionValue}
                            handleSelect={handleSelectShippingOption}
                        />
                    </>
                )}

                {activeStep === 3 && (
                    <>
                        <Typography
                            content={'cart_page.checkout_form.checkout.label'}
                            className={'text-2xl font-semibold mb-2'}
                            variant={'h4'}
                        />

                        {/* Discount code*/}
                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.checkout.discount_code'}
                                className={'text-base mb-2'}
                            />
                            <InputTextField
                                value={userPaymentInforForm.discountCode}
                                handleChange={handleChangeUserPayment}
                                type={'text'}
                                inputName={'discountCode'}
                                placeholder={'cart_page.checkout_form.checkout.discount_code'}
                                className={'border mb-1'}
                            />
                            <ErrorMessage
                                errorMessage={errorMessageUserAddressForm.streetAddress.message}
                                field={errorMessageUserAddressForm.streetAddress.field}
                            />
                        </div>

                        <div className={'mt-2'}>
                            <Typography
                                content={'cart_page.checkout_form.checkout.payment_method.label'}
                                className={'text-2xl font-semibold mb-2'}
                            />

                            <BaseRadioButtons
                                optionsList={optionsListPaymentMethod}
                                defaultValue={selectedPaymentOptionValue}
                                handleSelect={handleSelectPaymentOption}
                            />

                            {selectedPaymentOptionValue === 'card' && (
                                <div className={'mt-2'}>
                                    <Typography
                                        content={'cart_page.checkout_form.checkout.payment_method.credit_card.card_holder_name'}
                                        className={'text-base mb-2'}
                                    />

                                    {/* Card Name*/}
                                    <div>
                                        <InputTextField
                                            value={userPaymentInforForm.cardHolderName}
                                            handleChange={handleChangeUserPayment}
                                            type={'text'}
                                            inputName={'cardHolderName'}
                                            placeholder={'cart_page.checkout_form.checkout.payment_method.credit_card.card_holder_name'}
                                            className={'border mb-1'}
                                        />
                                        <ErrorMessage
                                            errorMessage={errorMessageUserAddressForm.streetAddress.message}
                                            field={errorMessageUserAddressForm.streetAddress.field}
                                        />
                                    </div>

                                    <div className={'mt-2 flex'}>
                                        {/* Card Number*/}
                                        <div className={'w-3/5 mr-4'}>
                                            <Typography
                                                content={'cart_page.checkout_form.checkout.payment_method.credit_card.card_number'}
                                                className={'text-base mb-2'}
                                            />

                                            <InputTextField
                                                value={userPaymentInforForm.cardNumber}
                                                handleChange={handleChangeUserPayment}
                                                type={'text'}
                                                inputName={'cardNumber'}
                                                placeholder={'cart_page.checkout_form.checkout.payment_method.credit_card.card_number'}
                                                className={'border mb-1'}
                                            />
                                            <ErrorMessage
                                                errorMessage={errorMessageUserAddressForm.streetAddress.message}
                                                field={errorMessageUserAddressForm.streetAddress.field}
                                            />
                                        </div>

                                        <div className={'w-1/3 mr-4'}>
                                            <Typography
                                                content={'cart_page.checkout_form.checkout.payment_method.credit_card.card_security_code'}
                                                className={'text-base mb-2'}
                                            />

                                            {/* Card CVV*/}
                                            <InputTextField
                                                value={userPaymentInforForm.cardSecurityCode}
                                                handleChange={handleChangeUserPayment}
                                                type={'text'}
                                                inputName={'cardSecurityCode'}
                                                placeholder={'cart_page.checkout_form.checkout.payment_method.credit_card.card_security_code'}
                                                className={'border mb-1'}
                                            />
                                            <ErrorMessage
                                                errorMessage={errorMessageUserAddressForm.streetAddress.message}
                                                field={errorMessageUserAddressForm.streetAddress.field}
                                            />
                                        </div>
                                        <div className={'w-2/5'}>
                                            <Typography
                                                content={'cart_page.checkout_form.checkout.payment_method.credit_card.card_expiry'}
                                                className={'text-base mb-2'}
                                            />
                                            <div>

                                                {/* Card Expiry*/}
                                                <div className={'flex justify-between items-center'}>
                                                    <div className={'w-1/2 mr-2'}>
                                                        <InputTextField
                                                            value={userPaymentInforForm.cardExpirationMonth}
                                                            handleChange={handleChangeUserPayment}
                                                            type={'text'}
                                                            inputName={'cardExpirationMonth'}
                                                            placeholder={'cart_page.checkout_form.checkout.payment_method.credit_card.card_expiry_month'}
                                                            className={'border mb-1'}
                                                        />
                                                    </div>

                                                    <Typography
                                                        content={'/'}
                                                        className={'text-base mr-2'}
                                                        needTranslate={false}
                                                    />

                                                    <div className={'w-1/2'}>
                                                        <InputTextField
                                                            value={userPaymentInforForm.cardExpirationYear}
                                                            handleChange={handleChangeUserPayment}
                                                            type={'text'}
                                                            inputName={'cardExpirationYear'}
                                                            placeholder={'cart_page.checkout_form.checkout.payment_method.credit_card.card_expiry_year'}
                                                            className={'border mb-1'}
                                                        />
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default CartUserInfoForm;

