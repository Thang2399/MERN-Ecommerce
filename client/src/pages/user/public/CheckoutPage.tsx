import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '../../../components/base/Typography';
import CheckoutForm from '../../../components/checkout/CheckoutForm';

import { RootState } from '@/store';
import { setShowLoadingIcon } from '@/store/common';

import services from '../../../services';
import CheckoutItems from '@/components/checkout/CheckoutItems';

export default function CheckoutPage(): JSX.Element {
    const dispatch = useDispatch();

    const userCommonInfor = useSelector((state: RootState) => state.commonReducer.userCommonInfor);

    const [ showForm, setShowForm ] = useState<boolean>(true);

    const handleGetListUserAddress = async () => {
        try {
            dispatch(setShowLoadingIcon(true));
            const query = {
                page: 1,
                limit: 10,
                orderBy: 'desc',
                orderType: 'updatedAt',
                userId: userCommonInfor.id
            };

            const res = await services.getListUserAddressByUserId(query);
            const data = res.data;


        } catch (err) {
            console.log('err', err);
        }
        dispatch(setShowLoadingIcon(false));
    };

    useEffect(() => {
        if (!userCommonInfor.id) {
            setShowForm(true);
        } else {
            handleGetListUserAddress();
        }

    }, [ userCommonInfor.id ]);

    return (
        <div className={'h-full'}>
            <Typography
                content={'cart_page.checkout'}
                variant={'h1'}
                className={'text-4xl font-semibold'}
            />

            <div className={'flex justify-between w-full h-full mt-5'}>
                <div className={'w-1/2 h-full'}>
                    <CheckoutItems />
                </div>

                <div className={'w-1/2 pl-8'}>
                    <div className={'border rounded-lg p-4'}>
                        <div className={'mt-3'}>
                            <CheckoutForm />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
