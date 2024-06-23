import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import Typography from '../base/Typography';
import Image from '../base/Image';

import { singleItemTypes } from '@/types/home';
import { RootState } from '@/store';
import { changeQuantityItem, removeItemFromCart, getTotalCartPrice, deleteCart } from '@/store/home';
import { convertMoney } from '@/utils/misc';
import { COMMON_CONSTANTS } from '@/constants';
import { REDUCER_HOME_ACTION } from '@/constants/reducer';
import Button from '../base/Button';
import RenderCurrency from '@/components/base/RenderCurrency';

interface ICart {
    setOpen: Dispatch<SetStateAction<boolean>>
}

const CartDrawer: React.FC<ICart> = ({ setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carItemsList = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const totalPriceInCart = useSelector(
        (state: RootState) => state.homePageReducer.totalPriceInCart,
    );

    const handleCloseQuickView = () => {
        setOpen(false);
    };

    const handleGetTotalCartPrice = () => {
        dispatch(getTotalCartPrice());
    };

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
        navigate('/checkout');
        handleCloseQuickView();
    };

    return (
        <div className={'w-full h-full flex'}>
            <div className={'bg-white w-full h-full p-5'}>
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

                                                    <RenderCurrency currency={item.currency} price={item.price} />
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
                                    <RenderCurrency price={totalPriceInCart} currency={'$'} />
                                </div>

                            </div>

                            <div className={'mt-3'}>
                                <Button
                                    content={'home_page.cart.checkout'}
                                    handleClick={handleCheckout}
                                    buttonClassName={'text-gray-400 bg-white border border-gray-300 mb-2'}
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

export default CartDrawer;
