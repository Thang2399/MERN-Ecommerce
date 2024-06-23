import { useState, useEffect } from 'react';
import services from '../../services';
import { singleCategoryWithTypicalItemTypes } from '@/types/home';

import { useDispatch, useSelector } from 'react-redux';

import ListItems from './ListItem/ListItems';
import { setShowLoadingIcon } from '@/store/common';
import QuickViewItem from '@/components/home/QuickView';
import { RootState } from '@/store';

export default function HomePageComponent(): JSX.Element {
    const dispatch = useDispatch();
    const showQuickView = useSelector(
        (state: RootState) => state.homePageReducer.showQuickView,
    );

    const [ listItems, setListItems ] = useState<singleCategoryWithTypicalItemTypes[]>([]);

    const getListItems = async () => {
        try {
            const query = {
                page: 1,
                limit: 10,
                orderBy: 'desc',
                orderType: 'updatedAt',
                filterByRootId: 'true'
            };

            dispatch(setShowLoadingIcon(true));
            const res = await services.getListCategoriesWithTypicalItems(query);
            if (res.data.data.length > 0) {
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
            <div className={'w-full h-full p-5'}>
                <ListItems listItems={listItems}/>
            </div>

            {showQuickView && (<QuickViewItem />)}

        </div>
    );
}
