import React, { useState, useEffect } from 'react';
import Navbar from '../components/base/Navbar';
import ListItems from '../components/home/ListItems';
import services from '../services';
import { singleItemTypes } from '../types';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { changeMoney, formatMoney } from '../utils/misc';
import { COMMON_CONSTANTS } from '../constants';

export default function PublicLayout(): JSX.Element {
	const [ listItems, setListItems ] = useState<singleItemTypes[]>([]);

	const currentLanguageCode = useSelector(
		(state: RootState) => state.changeLanguage.currentLanguage,
	);

	const getListItems = async () => {
		try {
			const res = await services.getListItems();
			if (res.data.length > 0) {
				const data = res.data;
                if (currentLanguageCode === COMMON_CONSTANTS.VN)
                {
                    const convertData = data.map( ( item: singleItemTypes ) =>
                    {
                        const convertPrice = changeMoney(
                            item.price,
                            currentLanguageCode
                        );
                        if (convertPrice)
                        {
                            return {
                                ...item,
                                price: convertPrice.price,
                                currency: convertPrice.currency,
                            };
                        }
                    } );
                    setListItems( convertData );
                } else { 
                    data.forEach((item: singleItemTypes) => {
                        item.price = formatMoney(item.price);
                    });
                    setListItems( data );
                }
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
        getListItems();
	}, [ currentLanguageCode ]);

	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div className={'px-20'}>
				<ListItems listItems={listItems} />
			</div>
		</div>
	);
}
