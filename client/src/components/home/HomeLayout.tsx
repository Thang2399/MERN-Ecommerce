import { useState, useEffect } from 'react';
import services from '../../services';
import { singleItemTypes } from '../../types/home';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import ListItems from './ListItems';
import QuickViewItem from './QuickView';

export default function HomeLayout(): JSX.Element {
    const [ listItems, setListItems ] = useState<singleItemTypes[]>([]);

    const showQuickView = useSelector(
        (state: RootState) => state.homePageReducer.showQuickView,
    );
    const specificItemId = useSelector(
        (state: RootState) => state.homePageReducer.itemId,
    );

    const showCart = useSelector(
        (state: RootState) => state.homePageReducer.showCart,
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


    return (
        <div className='w-screen h-full bg-blue-900'>
            <div className={'w-full h-full'}>
                <div className={'px-20 w-full h-1/3 bg-red-700'}>
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
        </div>
    );
}
