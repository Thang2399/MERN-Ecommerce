import React, { useState, useEffect } from 'react';
import SingleItem from './SingleItem';
import { singleItemTypes } from '../../types';

import QuickViewItem from './QuickView';
import { changeMoney } from '../../utils/misc';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
	listItems: singleItemTypes[];
};

const ListItems: React.FC<Props> = ({ listItems }) => {
	const [ showQuickView, setShowQuickView ] = useState<boolean>( false );

	return (
		<div>
			<div className={'w-full grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-4'}>
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
