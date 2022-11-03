import { useState, useEffect } from 'react';
import Navbar from '../components/base/Navbar';
import ListItems from '../components/home/ListItems';
import services from '../services';
import { singleItemTypes } from '../types';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

import QuickViewItem from '../components/home/QuickView';
import Cart from '../components/home/Cart';

export default function PublicLayout(): JSX.Element {
    const [ listItems, setListItems ] = useState<singleItemTypes[]>([]);

    const showQuickView = useSelector(
        (state: RootState) => state.changeLanguage.showQuickView,
    );
    const specificItemId = useSelector(
        (state: RootState) => state.changeLanguage.itemId,
    );

    const showCart = useSelector(
        (state: RootState) => state.changeLanguage.showCart,
    );

    const getListItems = async () => {
        try {
            const res = await services.getListItems();
            if (res.data.length > 0) {
                setListItems(res.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListItems();
    }, []);


    // const getTotalCartItems = () => {
    //
    // };

    return (
        <div className='w-screen h-full'>
            <div className={'relative w-full h-full'}>
                <div>
                    <Navbar/>
                </div>
                <div className={'px-20 py-4 w-full h-full'}>
                    <ListItems listItems={listItems}/>
                </div>
            </div>
            {showQuickView && (
                <div
                    className={
                        'absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 overflow-hidden'
                    }>
                    <QuickViewItem id={specificItemId}/>
                </div>
            )}

            {showCart && (
                <div
                    className={
                        'absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40'
                    }>
                    <Cart/>
                </div>
            )}
        </div>
    );
}
