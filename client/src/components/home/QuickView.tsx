import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showQuickView } from '../../store/home';
import { singleItemTypes } from '../../types';

import services from '../../services';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HTTP_STATUS } from '../../constants';

import Typography from '../base/Typography';
import Image from '../base/Image';
import Button from '../base/Button';

interface Props {
	id: string;
}

const QuickViewItem: React.FC<Props> = ({ id }) => {
	const dispatch = useDispatch();

	const [ item, setItem ] = useState<singleItemTypes | null>(null);

	const handleCloseQuickView = () => {
		dispatch(showQuickView(false));
	};

	const getDetailItem = async (id: string) => {
		try {
			const response = await services.getSingleItem(id);
			if (response.status === HTTP_STATUS.SUCCESS) {
				setItem(response.data);
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDetailItem(id);
    }, [ id ] );
    
    const addToCart = async ( id: string ) => {
        console.log( 'addToCart' );
	};

	return (
		<div className={'w-full h-full flex items-center justify-center'}>
			<div className={'bg-white mx-40 px-8 py-5 w-full rounded-lg'}>
				<div
					className={'flex justify-end mb-4 cursor-pointer text-3xl'}
					onClick={() => handleCloseQuickView()}>
					<AiOutlineCloseCircle />
				</div>
				{item && (
					<div className={'flex'}>
						<div className={'w-1/2 h-4/5'}>
							<Image imgUrl={item.imageUrl} />
						</div>
						<div className={'w-1/2'}>
							<Typography
								content={item.name}
								variant={'h2'}
								className={'text-xl font-medium'}
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

							<div className={'flex justify-between items-center mt-3 w-full'}>
								<Button
									handleClick={() => addToCart(item._id)}
									content={'home_page.add_to_cart'}
									buttonClassName={'bg-black w-3/5 mr-1'}
									typoClassName={'text-white font-light'}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuickViewItem;
