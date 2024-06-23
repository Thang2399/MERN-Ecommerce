import React, { useState } from 'react';
import Typography from '../base/Typography';

import { checkoutFormType } from '@/types/cart';
import { FIELD_TYPE } from '@/constants/field';
import { FieldProps } from '@/types/field';
import { Form, Formik, FormikErrors } from 'formik';
import RenderFormField from '@/components/base/RenderFormField';
import {
    optionsListPaymentMethod,
    optionsListShippingMethod,
    Payment_Method_Enum,
    Shipping_Method_Enum
} from '@/constants/checkout';
import * as yup from 'yup';
import Button from '@/components/base/Button';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { singleItemTypes } from '@/types/home';
import services from '@/services';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import { HTTP_STATUS } from '@/constants';
import { deleteCart } from '@/store/home';

const CheckoutForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carItemsList = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const totalPriceInCart = useSelector(
        (state: RootState) => state.homePageReducer.totalPriceInCart,
    );

    const [ checkoutForm, setCheckoutForm ] = useState<checkoutFormType>({
        userName: '',
        email: '',
        country: 'Viet Nam',
        city: 'Ha Noi',
        district: '',
        paymentMethod: Payment_Method_Enum.CARD,
        phoneNumber: '',
        shippingMethod: Shipping_Method_Enum.AT_HOME,
        streetAddress: ''
    });

    const checkoutFormSchema = yup.object().shape({
        userName: yup.string().required('error_messages.filed_required'),
        email: yup
            .string()
            .required('error_messages.filed_required')
            .email('error_messages.wrong_email_validate'),
        phoneNumber: yup.string().required('error_messages.filed_required'),
        shippingMethod: yup.string().oneOf([ Shipping_Method_Enum.AT_STORE, Shipping_Method_Enum.AT_HOME ]),
        paymentMethod: yup.string(),
        country: yup.string().when('shippingMethod', ([ shippingMethod ], sch) => {
            return shippingMethod === Shipping_Method_Enum.AT_HOME
                ? sch
                    .trim()
                    .required('error_messages.filed_required')
                : sch.notRequired();
        }),
        city: yup.string().when('shippingMethod', ([ shippingMethod ], sch) => {
            return shippingMethod === Shipping_Method_Enum.AT_HOME
                ? sch
                    .trim()
                    .required('error_messages.filed_required')
                : sch.notRequired();
        }),
        district: yup.string().when('shippingMethod', ([ shippingMethod ], sch) => {
            return shippingMethod === Shipping_Method_Enum.AT_HOME
                ? sch
                    .trim()
                    .required('error_messages.filed_required')
                : sch.notRequired();
        }),
        streetAddress: yup.string().when('shippingMethod', ([ shippingMethod ], sch) => {
            return shippingMethod === Shipping_Method_Enum.AT_HOME
                ? sch
                    .trim()
                    .required('error_messages.filed_required')
                : sch.notRequired();
        }),
    });

    const checkoutFieldsArr: FieldProps[] = [
        {
            label: 'cart_page.checkout_form.customer_information.user_name',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'userName',
            placeholder: 'cart_page.checkout_form.customer_information.user_name_placeholder',
            inputName: 'userName',
            dataTest: 'userName',
            errorMessageField: 'form.customer_name',
            errorMessageDataTest: 'errorCustomerName'
        },
        {
            label: 'cart_page.checkout_form.customer_information.email_address',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'email',
            placeholder: 'cart_page.checkout_form.customer_information.email_address_placeholder',
            inputName: 'email',
            dataTest: 'email',
            errorMessageField: 'form.email_address',
            errorMessageDataTest: 'errorEmail'
        },
        {
            label: 'cart_page.checkout_form.customer_information.phone_number',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'phoneNumber',
            placeholder: 'cart_page.checkout_form.customer_information.phone_number_placeholder',
            inputName: 'phoneNumber',
            dataTest: 'phoneNumber',
            errorMessageField: 'form.phone_number',
            errorMessageDataTest: 'errorPhoneNumber',
            isPhoneNumberInput: true
        },
        {
            label: 'cart_page.checkout_form.checkout.label',
            fieldType: FIELD_TYPE.RADIO,
            htmlFor: 'paymentMethod',
            inputName: 'paymentMethod',
            dataTest: 'paymentMethod',
            checkboxList: optionsListPaymentMethod,
            isRowRadio: true,
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                setFieldValue('paymentMethod', value);
            }
        },
        {
            label: 'cart_page.checkout_form.shipping_method.label',
            fieldType: FIELD_TYPE.RADIO,
            htmlFor: 'shippingMethod',
            inputName: 'shippingMethod',
            dataTest: 'shippingMethod',
            checkboxList: optionsListShippingMethod,
            isRowRadio: true,
            handleChange: (setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<any>>, value: string) => {
                setFieldValue('shippingMethod', value);
            }
        },
    ];

    const addressFieldsArr: FieldProps[] = [
        {
            label: 'cart_page.checkout_form.address.country',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'country',
            placeholder: 'cart_page.checkout_form.address.country_placeholder',
            inputName: 'country',
            dataTest: 'country',
            errorMessageField: 'form.country',
            errorMessageDataTest: 'errorCountry',
        },
        {
            label: 'cart_page.checkout_form.address.city',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'city',
            placeholder: 'cart_page.checkout_form.address.city_placeholder',
            inputName: 'city',
            dataTest: 'city',
            errorMessageField: 'form.city',
            errorMessageDataTest: 'errorCity',
        },
        {
            label: 'cart_page.checkout_form.address.district',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'district',
            placeholder: 'cart_page.checkout_form.address.district_placeholder',
            inputName: 'district',
            dataTest: 'district',
            errorMessageField: 'form.district',
            errorMessageDataTest: 'errorDistrict',
        },
        {
            label: 'cart_page.checkout_form.address.street_address',
            fieldType: FIELD_TYPE.INPUT,
            htmlFor: 'streetAddress',
            placeholder: 'cart_page.checkout_form.address.street_address',
            inputName: 'streetAddress',
            dataTest: 'streetAddress',
            errorMessageField: 'form.street_address',
            errorMessageDataTest: 'errorStreetAddress',
        },
    ];

    const handleSubmit = async (values: any) => {
        const listPurchaseItems = carItemsList.map((item: singleItemTypes) => ({
            itemId: item._id,
            itemQuantity: item.quantity
        }));

        const payload = {
            ...values,
            totalPrice: totalPriceInCart,
            redirectUrl: '',
            listPurchaseItems
        };

        try {
            dispatch(setShowLoadingIcon(true));
            const res = await services.createInvoice(payload);
            if (res && res.status === HTTP_STATUS.CREATE_SUCCESS) {
                if (values.paymentMethod !== Payment_Method_Enum.CARD) {
                    dispatch(setShowLoadingIcon(false));
                    dispatch(deleteCart());
                    dispatch(setShowToastMessage({
                        show: true,
                        message: 'cart_page.checkout_form.response.create_invoice_success',
                        type: 'success'
                    }));
                    navigate('/');
                }
            }
        } catch (err) {
            console.log('err', err);
            dispatch(setShowLoadingIcon(false));
            dispatch(setShowToastMessage({
                    show: true,
                    message: 'cart_page.checkout_form.response.create_invoice_failed',
                    type: 'error'
            }));
        }
    };

    return (
        <div>
            <Typography
                content={'cart_page.checkout_form.customer_information.label'}
                className={'text-2xl font-semibold mb-2'}
                variant={'h4'}
            />

            <Formik
                initialValues={checkoutForm}
                validationSchema={checkoutFormSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ values: formikValues, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, getFieldProps }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={'grid grid-rows-3 grid-flow-row gap-4'}>
                            {checkoutFieldsArr.map((field: FieldProps) => (
                                <React.Fragment key={field.inputName}>
                                    <div className="">
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
                            ))}
                        </div>

                        {getFieldProps('shippingMethod').value === Shipping_Method_Enum.AT_HOME && (
                            <div className={'mt-3 grid grid-rows-2 grid-flow-col gap-4'}>
                                {addressFieldsArr.map((field: FieldProps) => (
                            <React.Fragment key={field.inputName}>
                                    <div className="">
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
                            ))}
                            </div>
                        )}

                        <div className={'mt-3 flex justify-between items-center gap-4'}>
                            <Button
                                content={'cart_page.checkout_form.btn.back_home'}
                                btnType={'button'}
                                icon={<HiOutlineArrowNarrowLeft/>}
                                handleClick={() => navigate('/')}
                                buttonClassName={'bg-white border border-gray-400 rounded'}
                            />
                            <Button
                                content={'cart_page.checkout_form.btn.submit'}
                                btnType={'submit'}
                                icon={<BsFillCartCheckFill className={'text-white'}/>}
                                typoClassName={'text-white'}
                            />
                        </div>

                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default CheckoutForm;

