import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

export default function PaymentPage(): JSX.Element {
    
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

    const userFormData = useSelector((state: RootState) => state.cartPageReducer.userInforForm);

    console.log('userFormData', userFormData);
    
	return (
        <div className={'pt-20'}>PaymentPage</div>
    );
}
