import { singleItemTypes } from '@/types/home';
import Image from '@/components/base/Image';
import Typography from '@/components/base/Typography';
import RenderCurrency from '@/components/base/RenderCurrency';
import { REDUCER_HOME_ACTION } from '@/constants/reducer';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeQuantityItem, getTotalCartPrice, removeItemFromCart } from '@/store/home';
import React from 'react';

const CheckoutItems: React.FC = () => {
    const dispatch = useDispatch();

    const carItemsList = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const quantityInCart = useSelector(
        (state: RootState) => state.homePageReducer.quantityInCart,
    );

    const totalPriceInCart = useSelector(
        (state: RootState) => state.homePageReducer.totalPriceInCart,
    );


    const handleRemoveItemFromCart = (id: string) => {
        dispatch(removeItemFromCart(id));
        dispatch(getTotalCartPrice());
    };

    const onChangeQuantity = (id: string, action: string) => {
        const payload = {
            id,
            type: action
        };
        dispatch(changeQuantityItem(payload));
        dispatch(getTotalCartPrice());
    };

    return (
        <>
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
                                        <RenderCurrency price={item.price} currency={item.currency}/>
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
                    <div>
                        <Typography
                            content={'home_page.cart.subtotal'}
                            variant="span"
                            className={'text-2xl font-semibold'}
                        />
                        {' - '}
                        <Typography
                            content={quantityInCart}
                            variant="span"
                            className={'text-2xl font-semibold mr-1'}
                        />
                        <Typography
                            content={'home_page.cart.items'}
                            variant="span"
                            className={'text-2xl font-semibold'}
                        />
                        :
                    </div>
                </div>

                <div className={'flex'}>
                    <RenderCurrency price={totalPriceInCart}/>
                </div>
            </div>
        </>
    );
};

export default CheckoutItems;
