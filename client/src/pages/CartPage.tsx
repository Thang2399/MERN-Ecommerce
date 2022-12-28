import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '../components/base/Typography';
import Image from '../components/base/Image';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import CartUserInfoForm from '../components/cart/CartUserInfoForm';

import { singleItemTypes } from '../types/home';
import {
    userAddress,
    userAddressFormErrorMessages,
    userInforFormErrorMessages,
    userInformation
} from '../types/cart';
import { RootState } from '../store';
import { COMMON_CONSTANTS } from '../constants';
import { convertMoney } from '../utils/misc';
import { changeQuantityItem, getTotalCartPrice, removeItemFromCart } from '../store/home';
import { setUserInforFormData } from '../store/cart';
import { REDUCER_HOME_ACTION } from '../constants/reducer';
import Stepper from '../components/base/Stepper';
import { useNavigate } from 'react-router-dom';
import { userInformationForm, userInformationFormErrorMessage, userAddressForm, userAddressFormErrorMessage } from '../form/cart';
import { checkValidateFormUserInfo, checkValidateFormUserAddress } from '../utils/cart';

const steps = [
    'cart_page.checkout_form.steppers.user_info',
    'cart_page.checkout_form.steppers.address',
    'cart_page.checkout_form.steppers.shipping_method'
];

const optionsList = [
    {
        label: 'cart_page.checkout_form.card_options_list.home',
        value: 'home'
    },
    {
        label: 'cart_page.checkout_form.card_options_list.store',
        value: 'store'
    }
];

export default function CartPage(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ activeStep, setActiveStep ] = useState<number>(0);
    const [ userInforForm, setUserInforForm ] = useState<userInformation>(userInformationForm);
    const [ userAddressInforForm, setUserAddressInforForm ] = useState<userAddress>(userAddressForm);
    const [ errorMessageUserInforForm, setErrorMessageUserInforForm ] = useState<userInforFormErrorMessages>(userInformationFormErrorMessage);
    const [ errorMessageUserAddressForm, setErrorMessageUserAddressForm ] = useState<userAddressFormErrorMessages>(userAddressFormErrorMessage);
    const [ selectedOptionValue, setSelectedOptionValue ] = useState<string>(optionsList[0].value);

    const carItemsList = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const quantityInCart = useSelector(
        (state: RootState) => state.homePageReducer.quantityInCart,
    );

    const currentLanguageCode = useSelector(
        (state: RootState) => state.homePageReducer.currentLanguage,
    );

    const totalPriceInCart = useSelector(
        (state: RootState) => state.homePageReducer.totalPriceInCart,
    );

    const currency = useSelector(
        (state: RootState) => state.homePageReducer.currency,
    );

    const onChangeQuantity = (id: string, action: string) => {
        const payload = {
            id,
            type: action
        };
        dispatch(changeQuantityItem(payload));
        dispatch(getTotalCartPrice());
    };

    const handleRemoveItemFromCart = (id: string) => {
        dispatch(removeItemFromCart(id));
        dispatch(getTotalCartPrice());
    };

    const handleGoBack = () => {
        if (activeStep === 0) {
            navigate('/');
        } else {
            setActiveStep((step: number) => (step - 1));
        }
    };

    const handleCheckValidateUserInforForm = () => {
        const errorMsg = checkValidateFormUserInfo(userInforForm);
        setErrorMessageUserInforForm(errorMsg);

        let error = 0;
        let key: keyof userInforFormErrorMessages;
        for (key in errorMsg) {
            if (errorMsg[key].message !== '') error ++;
        }

        return error;
    };

    const handleCheckValidateUserAddressForm = () => {
        const errorMsg = checkValidateFormUserAddress(userAddressInforForm);
        setErrorMessageUserAddressForm(errorMsg);

        let error = 0;
        let key: keyof userAddressFormErrorMessages;
        for (key in errorMsg) {
            if (errorMsg[key].message !== '') error ++;
        }

        return error;
    };

    const handleNext = () => {
        let error = 0;
        if (activeStep === 0) {
            error =  handleCheckValidateUserInforForm();
        } else if (activeStep === 1) {
            error = handleCheckValidateUserAddressForm();
        }
        if (error === 0) {
            setActiveStep((step: number) => (step + 1));
        }
    };

    const handleSubmit = () => {
        const isShipToHome = selectedOptionValue === 'home' ? true : false;
        const formData = { ...userInforForm, ...userAddressInforForm, isShipToHome };
        dispatch(setUserInforFormData(formData));
        navigate('/payment');
    };

    const handleConfirm = (e: any) => {
        e.preventDefault();

        if (activeStep !== steps.length -1) {
            handleNext();
        } else handleSubmit();
    };

    return (
        <div className={'pt-20 h-5/6 px-20'}>
            <Typography
                content={'cart_page.checkout'}
                variant={'h1'}
                className={'text-4xl font-semibold'}
            />

            <div className={'flex justify-between w-full h-full mt-5'}>
                <div className={'w-1/2 h-full'}>
                    <div className={'w-full h-full overflow-auto border rounded-lg px-4'}>
                        {carItemsList.map((item: singleItemTypes) => {
                            return (
                                <div
                                    key={item._id}
                                    className={'flex mb-2 border-b py-4 last:mb-0 last:border-b-0'}
                                >
                                    <div className={'w-1/5 h-1/5 mr-3'}>
                                        <Image imgUrl={item.imageUrl}/>
                                    </div>
                                    <div className={'w-4/5 flex justify-between'}>
                                        <div>
                                            <Typography
                                                content={item.name}
                                                variant={'h3'}
                                                className={'text-2xl font-semibold'}
                                                needTranslate={false}
                                            />

                                            <div className={'flex'}>
                                                {currentLanguageCode === COMMON_CONSTANTS.EN && (
                                                    <>
                                                        <Typography
                                                            content={item.currency && convertMoney(item.price, item.currency, currentLanguageCode)?.currency || item.currency}
                                                            needTranslate={false}
                                                            className={'mr-0.5'}
                                                        />
                                                    </>
                                                )}
                                                <Typography
                                                    content={item.price && convertMoney(item.price, item.currency, currentLanguageCode)?.price || item.price}
                                                    className={'font-semibold'}
                                                    needTranslate={false}
                                                />
                                                {currentLanguageCode === COMMON_CONSTANTS.VN && (
                                                    <>
                                                        <Typography
                                                            content={item.currency && convertMoney(item.price, item.currency, currentLanguageCode)?.currency || item.currency}
                                                            needTranslate={false}
                                                            className={'ml-1'}
                                                        />
                                                    </>
                                                )}
                                            </div>

                                            <div
                                                className={'cursor-pointer'}
                                                onClick={() => handleRemoveItemFromCart(item._id)}>
                                                <Typography
                                                    content={'home_page.cart.remove_item'}
                                                    className={'text-xs text-gray-400 hover:text-black'}
                                                />
                                            </div>
                                        </div>

                                        <div className={'flex justify-center items-center'}>
                                            <div className={'flex flex-col items-center'}>
                                                <div
                                                    className={'text-2xl cursor-pointer'}
                                                    onClick={() => onChangeQuantity(item._id, REDUCER_HOME_ACTION.INCREASE)}
                                                >
                                                    <AiFillCaretUp/>
                                                </div>
                                                <Typography
                                                    content={item.quantity.toString()}
                                                    needTranslate={false}
                                                />
                                                <div
                                                    className={'text-2xl cursor-pointer'}
                                                    onClick={() => onChangeQuantity(item._id, REDUCER_HOME_ACTION.DECREASE)}
                                                >
                                                    <AiFillCaretDown/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    <div className={'mt-4 flex justify-between items-center'}>
                        <div className={'flex'}>
                            <Typography
                                content={'home_page.cart.subtotal'}
                                variant="h2"
                                className={'text-2xl font-semibold mr-1'}
                            />
                            (
                            <Typography
                                content={quantityInCart}
                                variant="h2"
                                className={'text-2xl font-semibold mr-1'}
                            />
                            <Typography
                                content={'home_page.cart.items'}
                                variant="h2"
                                className={'text-2xl font-semibold'}
                            />
                            ):

                        </div>

                        <div className={'flex'}>
                            {currentLanguageCode === COMMON_CONSTANTS.EN && (
                                <>
                                    <Typography
                                        content={currency}
                                        needTranslate={false}
                                        className={'mr-0.5'}
                                        variant={'span'}
                                    />
                                </>
                            )}
                            <Typography
                                content={totalPriceInCart && convertMoney(totalPriceInCart, currency, currentLanguageCode)?.price || totalPriceInCart}
                                needTranslate={false}
                                className={'font-semibold text-2xl'}
                            />
                            {currentLanguageCode === COMMON_CONSTANTS.VN && (
                                <>
                                    <Typography
                                        content={currency}
                                        needTranslate={false}
                                        className={'ml-0.5'}
                                        variant={'span'}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                </div>

                <div className={'w-2/5'}>
                    <div className={'border rounded-lg p-4'}>
                        <div>
                            <Stepper
                                steps={steps}
                                activeStep={activeStep}
                            />
                        </div>

                        <div className={'mt-3'}>
                            <CartUserInfoForm
                                userInforForm={userInforForm}
                                setUserInforForm={setUserInforForm}
                                activeStep={activeStep}
                                errorMessageUserInforForm={errorMessageUserInforForm}
                                userAddressInforForm={userAddressInforForm}
                                setUserAddressInforForm={setUserAddressInforForm}
                                errorMessageUserAddressForm={errorMessageUserAddressForm}
                                optionsList={optionsList}
                                selectedOptionValue={selectedOptionValue}
                                setSelectedOptionValue={setSelectedOptionValue}
                            />
                        </div>

                        <div className={'flex justify-between mt-3'}>
                            <div
                                className={'flex items-center cursor-pointer'}
                                onClick={handleGoBack}
                            >
                                <HiOutlineArrowNarrowLeft />
                                {
                                    activeStep === 0
                                        ? (
                                            <Typography
                                                content={'cart_page.checkout_form.btn.back_home'}
                                                className={'ml-2'}
                                            />
                                        )
                                        : (
                                            <Typography
                                                content={'cart_page.checkout_form.btn.back'}
                                                className={'ml-2'}
                                            />
                                        )
                                }

                            </div>

                            <div
                                className={'flex items-center cursor-pointer'}
                                onClick={handleConfirm}
                            >
                                {activeStep === steps.length - 1
                                    ? (
                                        <Typography
                                            content={'cart_page.checkout_form.btn.submit'}
                                            className={'mr-2'}
                                        />
                                    )
                                    : (
                                        <Typography
                                            content={'cart_page.checkout_form.btn.next'}
                                            className={'mr-2'}
                                        />
                                    )
                                }

                                <HiOutlineArrowNarrowRight />
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                </div>


            </div>
        </div>
    );
}
