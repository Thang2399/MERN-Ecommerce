import React from 'react';
import { useDispatch } from 'react-redux';

import { showQuickView, getDetailItem } from '../../store/home';
import { singleItemTypes } from '../../types';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button';

type Props = {
	item: singleItemTypes;
};

const SingleItem: React.FC<Props> = ({ item }) => {
	const dispatch = useDispatch();

	const handleViewDetailItem = (id: string) => {
		dispatch(showQuickView(true));
		dispatch(getDetailItem(id));
	};

	const addToCart = async (id: string) => {
		console.log('addToCart');
	};

	return (
		<div
			className={
				'w-full h-full p-4 bg-white shadow-2xl transition delay-150 cursor-pointer rounded'
			}>
			<div>
				<div className={'w-full'}>
					<Image imgUrl={item.imageUrl} className={'w-60 h-56'} />
				</div>
				<Typography
					content={item.name}
					variant={'h2'}
					className={'text-xl font-medium mt-3 text-center'}
					needTranslate={false}
				/>
				<div className={'flex mt-3'}>
					<Typography
						content={item.currency}
						className={'mr-1'}
						needTranslate={false}
					/>
					<Typography
						content={item.price}
						className={'text-2xl font-semibold'}
						needTranslate={false}
					/>
				</div>
			</div>

			<div className={'flex justify-between items-center mt-3'}>
				<Button
					handleClick={() => addToCart(item._id)}
					content={'home_page.add_to_cart'}
					buttonClassName={'bg-black w-3/5 mr-1'}
					typoClassName={'text-white font-light'}
				/>
				<Button
					handleClick={() => handleViewDetailItem(item._id)}
					content={'home_page.view_detail'}
					buttonClassName={'bg-gray-400 w-2/5'}
					typoClassName={'text-white font-light'}
				/>
			</div>
		</div>
	);
};

export default SingleItem;
