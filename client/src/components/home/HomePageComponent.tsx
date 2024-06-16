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

    const getListItems = async () => {
        try {
            const query = {
                page: 1,
                limit: 100,
                orderBy: 'desc',
                orderType: 'updatedAt'
            };

            dispatch(setShowLoadingIcon(true));
            const res = await services.getListItems(query);
            if (res.data.data.length > 0) {
                console.log('res.data', res.data);
                setListItems(res.data.data);
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
        </div>
    );
}
