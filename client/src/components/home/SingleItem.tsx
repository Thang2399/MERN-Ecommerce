import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showQuickView, getDetailItem, addItemToCart, getTotalCartPrice } from '../../store/home';
import { singleItemTypes } from '../../types';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button';
import { RootState } from '../../store';
import { convertMoney } from '../../utils/misc';
import { COMMON_CONSTANTS } from '../../constants';

type Props = {
    item: singleItemTypes;
};

const SingleItem: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch();

    const currentLanguageCode = useSelector(
        (state: RootState) => state.changeLanguage.currentLanguage,
    );

    const cartItemsList = useSelector((state: RootState) => state.changeLanguage.cartItemsList,);

    const handleViewDetailItem = (id: string) => {
        dispatch(showQuickView(true));
        dispatch(getDetailItem(id));
    };

    const addToCart = async (item: singleItemTypes) => {
        const addCartItem = {
                ...item,
                quantity: 1
            };
        dispatch(addItemToCart(addCartItem));
        dispatch(getTotalCartPrice());
    };

    return (
        <div
            className={
                'w-full h-full p-4 bg-white shadow-2xl transition delay-150 cursor-pointer rounded'
            }>
            <div>
                <div className={'w-full'}>
                    <Image imgUrl={item.imageUrl} className={'w-60 h-56'}/>
                </div>
                <Typography
                    content={item.name}
                    variant={'h2'}
                    className={'text-xl font-medium mt-3 text-center'}
                    needTranslate={false}
                />
                <div className={'flex mt-3'}>
                    {currentLanguageCode === COMMON_CONSTANTS.EN && (
                        <>
                            <Typography
                                content={item.currency && convertMoney(item.price, item.currency, currentLanguageCode)?.currency || item.currency}
                                needTranslate={false}
                                className={'mr-1'}
                            />
                        </>
                    )}
                        <Typography
                            content={item.price && convertMoney(item.price, item.currency, currentLanguageCode)?.price || item.price}
                            className={'text-2xl font-semibold'}
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

            <div className={'flex justify-between items-center mt-3'}>
                <Button
                    handleClick={() => addToCart(item)}
                    content={'home_page.add_to_cart'}
                    buttonClassName={'bg-black w-3/5 mr-1'}
                    typoClassName={'text-white font-light'}
                />
                <Button
                    handleClick={() => handleViewDetailItem(item._id)}
                    content={'home_page.view_detail'}
                    buttonClassName={'bg-gray-400 w-2/5'}
                    typoClassName={'text-white font-light'}
                />
            </div>
        </div>
    );
};

export default SingleItem;
