import React from 'react';
import SingleItem from './SingleItem';
import { singleItemTypes } from '../../types';

type Props = {
	listItems: singleItemTypes[];
};

const ListItems: React.FC<Props> = ({ listItems }) => {
	return (
		<div>
			<div
				className={
					'w-full h-full grid grid-cols-5 md:grid-cols-2 lg:grid-cols-4 gap-5'
				}>
				{listItems.map((item: singleItemTypes) => (
					<div key={item._id}>
						<SingleItem item={item} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ListItems;
