import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import Typography from '../base/Typography';
import Image from '../base/Image';

import { singleItemTypes } from '../../types/home';
import { RootState } from '../../store';
import { showCart, changeQuantityItem, removeItemFromCart, getTotalCartPrice, deleteCart } from '../../store/home';
import { convertMoney } from '../../utils/misc';
import { COMMON_CONSTANTS } from '../../constants';
import { REDUCER_HOME_ACTION } from '../../constants/reducer';
import Button from '../base/Button';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carItemsList = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    console.log('carItemsLis123123123t', carItemsList);

    const currentLanguageCode = useSelector(
        (state: RootState) => state.homePageReducer.currentLanguage,
    );

    const totalPriceInCart = useSelector(
        (state: RootState) => state.homePageReducer.totalPriceInCart,
    );

    const currency = useSelector(
        (state: RootState) => state.homePageReducer.currency,
    );

    const handleCloseQuickView = () => {
        dispatch(showCart(false));
    };

    const handleGetTotalCartPrice = () => {
        dispatch(getTotalCartPrice());
    };

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                handleCloseQuickView();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        handleGetTotalCartPrice();
    }, [ carItemsList ]);

    const onChangeQuantity = (id: string, action: string) => {
        const payload = {
            id, type: action
        };
        dispatch(changeQuantityItem(payload));
    };

    const handleRemoveItemFromCart = (id: string) => {
        dispatch(removeItemFromCart(id));
    };

    const handleDeleteCart = () => {
        dispatch(deleteCart());
    };

    const handleCheckout = () => {
        navigate('/cart');
        handleCloseQuickView();
    };

    return (
        <div className={'w-full h-full flex pt-16'}>
            <div
                className={'w-3/4'}
                onClick={() => handleCloseQuickView()}
            />
            <div className={'bg-white w-1/4 h-full p-5'}>
                <div
                    className={'flex justify-end mb-4 cursor-pointer text-3xl'}
                    onClick={() => handleCloseQuickView()}>
                    <AiOutlineCloseCircle/>
                </div>

                {carItemsList.length === 0
                    ? (
                        <div>
                            <Typography
                                content={'home_page.cart.empty_cart'}
                                variant="h2"
                            />
                        </div>
                    )
                    : (
                        <div className={'mt-2 h-4/5'}>
                            <div className={'h-4/5 overflow-auto'}>
                                {carItemsList.map((item: singleItemTypes) => {
                                    return (
                                        <div key={item._id} className={'flex items-center mb-2 last:mb-0'}>
                                            <div className={'w-2/5 h-2/5'}>
                                                <Image imgUrl={item.imageUrl}/>
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <Typography
                                                    content={item.name}
                                                    variant={'h3'}
                                                    className={'text-xl'}
                                                    needTranslate={false}
                                                />

                                                <div className={'flex items-center'}>
                                                    <Typography
                                                        content={item.quantity.toString()}
                                                        needTranslate={false}
                                                    />

                                                    <IoIosClose/>

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
                                                </div>

                                                <div className={'flex items-center'}>
                                                    <div
                                                        className={'cursor-pointer mr-2'}
                                                        onClick={() => onChangeQuantity(item._id, REDUCER_HOME_ACTION.DECREASE)}
                                                    >
                                                        <AiOutlineMinusCircle/>
                                                    </div>
                                                    <Typography
                                                        content={item.quantity.toString()}
                                                    />
                                                    <div
                                                        className={'cursor-pointer ml-2'}
                                                        onClick={() => onChangeQuantity(item._id, REDUCER_HOME_ACTION.INCREASE)}>
                                                        <AiOutlinePlusCircle/>
                                                    </div>
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
                                        </div>

                                    );
                                })}
                            </div>

                            <div className={'mt-4 pt-3 flex justify-between border-t-2'}>
                                <Typography
                                    content={'home_page.cart.subtotal'}
                                    variant="h2"
                                    className={'mr-1'}
                                />
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

                            <div className={'mt-3'}>
                                <Button
                                    content={'home_page.cart.checkout'}
                                    handleClick={handleCheckout}
                                    buttonClassName={'text-gray-300 bg-white border border-gray-300 mb-2'}
                                />
                                <Button
                                    content={'home_page.cart.delete_cart'}
                                    handleClick={handleDeleteCart}
                                    buttonClassName={'text-white bg-gray-300'}
                                />
                            </div>
                        </div>
                    )}


            </div>
        </div>
    );
};

export default Cart;
