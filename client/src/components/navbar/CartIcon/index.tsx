import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { Badge, Drawer } from '@mui/material';
import CartDrawer from '@/components/home/CartDrawer';

export default function CartNavbarIcon() {
    const [ open, setOpen ] = useState<boolean>(false);

    const cartItems = useSelector(
        (state: RootState) => state.homePageReducer.cartItemsList,
    );

    const quantityInCart = useSelector(
        (state: RootState) => state.homePageReducer.quantityInCart,
    );

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Badge badgeContent={quantityInCart} color="primary" onClick={() => setOpen(true)}>
                <div className={
                    'text-white text-3xl relative w-10 h-10 flex items-center cursor-pointer'
                }>
                    {cartItems.length > 0
                        ? <BsFillCartFill/>
                        : <AiOutlineShoppingCart/>
                    }
                </div>
            </Badge>

            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <CartDrawer setOpen={setOpen}/>
            </Drawer>

        </>
    );
}
