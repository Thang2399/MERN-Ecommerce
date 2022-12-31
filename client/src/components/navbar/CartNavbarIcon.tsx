import React from 'react';
import { showCart } from '../../store/home';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { MdShoppingCart, MdOutlineAddShoppingCart } from 'react-icons/md';

const CartNavbarIcon = () => {
    const dispatch = useDispatch();

    const showCartStatus = useSelector(
        (state: RootState) => state.homePageReducer.showCart,
    );

    const cartItems = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const quantityInCart = useSelector(
        (state: RootState) => state.homePageReducer.quantityInCart,
    );
    const handleShowCart = () => {
        dispatch(showCart(!showCartStatus));
    };

    return (
        <>
            <div
                className={
                    'text-white text-3xl relative w-20 h-10 flex justify-center items-center cursor-pointer'
                }
                onClick={handleShowCart}>
                {cartItems.length > 0
                    ? <MdShoppingCart/>
                    : <MdOutlineAddShoppingCart/>
                }

                <div
                    className={
                        'bg-gray-400 w-5 h-5 rounded-full flex justify-center items-center text-sm absolute top-0 right-0'
                    }>
                    {quantityInCart}
                </div>
            </div>
        </>
    );
};

export default CartNavbarIcon;