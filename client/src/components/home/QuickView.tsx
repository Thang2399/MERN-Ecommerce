import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, getTotalCartPrice, setShowQuickView,  } from '@/store/home';
import { singleItemTypes } from '@/types/home';

import services from '../../services';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HTTP_STATUS } from '@/constants';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button';
import { RootState } from '@/store';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ReactLoading from 'react-loading';
import RenderCurrency from '@/components/base/RenderCurrency';

const QuickViewItem: React.FC = () => {
    const dispatch = useDispatch();

    const showQuickView = useSelector(
        (state: RootState) => state.homePageReducer.showQuickView,
    );

    const itemId = useSelector(
        (state: RootState) => state.homePageReducer.itemId,
    );

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ item, setItem ] = useState<singleItemTypes>({
        _id: '',
        brandId: '',
        categoryId: '',
        currency: '',
        description: '',
        imageUrl: '',
        isFavoriteItem: false,
        name: '',
        price: '',
        quantity: 0,
        subCategoryId: ''
    });

    const handleCloseQuickView = () => {
        dispatch(setShowQuickView(false));
    };

    const getDetailItem = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await services.getSingleItem(id);
            if (response.status === HTTP_STATUS.SUCCESS) {
                setItem(response.data);
            }
        } catch (error: any) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getDetailItem(itemId);
    }, [ itemId ]);

    const addToCart = async (item: singleItemTypes) => {
        const addCartItem = {
            ...item,
            quantity: 1
        };
        dispatch(addItemToCart(addCartItem));
        dispatch(getTotalCartPrice());
    };

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={showQuickView}
            onClose={handleCloseQuickView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <>
                {
                    isLoading
                    ? (<ReactLoading type={'spin'} color={'#374151'} width={'80px'} height={'80px'}/>)
                    : (
                            <>
                                <div
                                    className={'flex justify-end mb-4 cursor-pointer text-3xl'}
                                    onClick={() => handleCloseQuickView()}>
                                    <AiOutlineCloseCircle/>
                                </div>

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
                                            <RenderCurrency currency={item.currency} price={item.price} />
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
                            </>
                        )
                }
                </>

            </Box>
        </Modal>
    );
};

export default QuickViewItem;
