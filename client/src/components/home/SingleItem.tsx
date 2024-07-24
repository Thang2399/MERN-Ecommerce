import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDetailItem, addItemToCart, getTotalCartPrice, setShowQuickView } from '../../store/home';
import { singleItemTypes } from '@/types/home';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button/Button';
import { RootState } from '@/store';
import { convertMoney } from '@/utils/misc';
import { COMMON_CONSTANTS } from '@/constants';
import RenderCurrency from '@/components/base/RenderCurrency';

type Props = {
    item: singleItemTypes;
};

const SingleItem: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch();

    const handleViewDetailItem = (id: string) => {
        dispatch(setShowQuickView(true));
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
            className={'w-full h-full p-4 bg-white cursor-pointer rounded-xl border'}
        onClick={() => handleViewDetailItem(item._id)}
        >
            <div>
                <div className={'w-full'}>
                    <Image imgUrl={item.imageUrl}/>
                </div>
                <Typography
                    content={item.name}
                    variant={'h2'}
                    className={'text-xl font-medium mt-3 text-center'}
                    needTranslate={false}
                />
                <div className={'flex mt-3 text-xl'}>
                    <RenderCurrency currency={item.currency} price={item.price} />
                </div>
            </div>

            <div className={'flex justify-between items-center mt-3'}>
                <Button
                    handleClick={() => addToCart(item)}
                    content={'home_page.add_to_cart'}
                    buttonClassName={'bg-primary w-3/5 mr-1'}
                    typoClassName={'text-white font-light'}
                />
                <Button
                    handleClick={() => handleViewDetailItem(item._id)}
                    content={'home_page.view_detail'}
                    buttonClassName={'bg-light w-2/5'}
                    typoClassName={'text-black font-light'}
                />
            </div>
        </div>
    );
};

export default SingleItem;
