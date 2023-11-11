import { useState, useEffect } from 'react';
import services from '../../services';
import { singleItemTypes } from '../../types/home';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import ListItems from './ListItems';
import QuickViewItem from './QuickView';
import { setShowLoadingIcon } from '../../store/common';

export default function HomePageComponent(): JSX.Element {
    const dispatch = useDispatch();

    const [ listItems, setListItems ] = useState<singleItemTypes[]>([]);

    const showQuickView = useSelector(
        (state: RootState) => state.homePageReducer.showQuickView,
    );
    const specificItemId = useSelector(
        (state: RootState) => state.homePageReducer.itemId,
    );

    const getListItems = async () => {
        try {
            dispatch(setShowLoadingIcon(true));
            const res = await services.getListItems();
            if (res.data.length > 0) {
                setListItems(res.data);
            }
        } catch (error: any) {
            console.log(error);
        }         
        dispatch(setShowLoadingIcon(false));
    };

    useEffect(() => {
        getListItems();
    }, []);


    return (
        <div className='h-full'>
            <div className={'w-full h-full'}>
                <div className={'w-full h-1/3'}>
                    <ListItems listItems={listItems}/>
                </div>
            </div>
            {showQuickView && (
                <div
                    className={
                        'absolute top-0 left-0 bg-black bg-opacity-40 overflow-hidden'
                    }>
                    <QuickViewItem id={specificItemId}/>
                </div>
            )}
        </div>
    );
}
