import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, getTotalCartPrice, showQuickView } from '../../store/home';
import { singleItemTypes } from '../../types';

import services from '../../services';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { COMMON_CONSTANTS, HTTP_STATUS } from '../../constants';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button';
import { RootState } from '../../store';
import { convertMoney } from '../../utils/misc';

interface Props {
    id: string;
}

const QuickViewItem: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch();
    
    const currentLanguageCode = useSelector(
        (state: RootState) => state.changeLanguage.currentLanguage,
    );

    const [ item, setItem ] = useState<singleItemTypes | null>(null);

    const handleCloseQuickView = () => {
        dispatch(showQuickView(false));
    };

    const getDetailItem = async (id: string) => {
        try {
            const response = await services.getSingleItem(id);
            if (response.status === HTTP_STATUS.SUCCESS) {
                setItem(response.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetailItem(id);
    }, [ id ]);

    const addToCart = async (item: singleItemTypes) => {
        const addCartItem = {
            ...item,
            quantity: 1
        };
        dispatch(addItemToCart(addCartItem));
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

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <div className={'bg-white mx-40 px-8 py-5 w-full rounded-lg'}>
                <div
                    className={'flex justify-end mb-4 cursor-pointer text-3xl'}
                    onClick={() => handleCloseQuickView()}>
                    <AiOutlineCloseCircle/>
                </div>
                {item && (
                    <div className={'flex'}>
                        <div className={'w-1/2 h-4/5'}>
                            <Image imgUrl={item.imageUrl}/>
                        </div>
                        <div className={'w-1/2'}>
                            <Typography
                                content={item.name}
                                variant={'h2'}
                                className={'text-xl font-medium'}
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

                            <div className={'flex justify-between items-center mt-3 w-full'}>
                                <Button
                                    handleClick={() => addToCart(item)}
                                    content={'home_page.add_to_cart'}
                                    buttonClassName={'bg-black w-3/5 mr-1'}
                                    typoClassName={'text-white font-light'}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuickViewItem;
