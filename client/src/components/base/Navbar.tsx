import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../store';
import LocalesSwitcher from '../common/LocalesSwitcher';
import Logo from '../common/Logo';
import InputTextField from './InputTextField';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { showCart } from '../../store/home';

export default function Navbar(): JSX.Element {
    const [ searchValue, setSearchValue ] = useState<string>('');

    const showCartStatus = useSelector(
        (state: RootState) => state.homePageReducer.showCart,
    );
    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );
    const quantityInCart = useSelector(
        (state: RootState) => state.homePageReducer.quantityInCart,
    );
    const handleShowCart = () => {
        dispatch(showCart(!showCartStatus));
    };

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={'bg-black flex items-center px-3 py-2'}>
            <div className={'mr-4'}>
                <Logo/>
            </div>
            <div className={'w-1/3 mr-4'}>
                <InputTextField
                    value={searchValue}
                    handleChange={handleChange}
                    inputName={'searchValue'}
                    type={'text'}
                    placeholder={'home_page.search_box_placeholder'}
                />
            </div>
            <div className={'mr-4'}>
                <LocalesSwitcher/>
            </div>
            <div
                className={
                    'text-white text-3xl relative w-20 h-10 flex justify-center items-center cursor-pointer'
                }
                onClick={handleShowCart}>
                {cartItems.length > 0
                    ? <BsFillCartCheckFill/>
                    : <AiOutlineShoppingCart/>
                }

                <div
                    className={
                        'bg-gray-400 w-5 h-5 rounded-full flex justify-center items-center text-sm absolute top-0 right-0'
                    }>
                    {quantityInCart}
                </div>
            </div>
        </div>
    );
}
