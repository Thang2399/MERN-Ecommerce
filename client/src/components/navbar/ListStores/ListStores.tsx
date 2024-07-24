import React from 'react';
import { GoLocation } from 'react-icons/go';
import Typography from '@/components/base/Typography';
import { RiArrowDownSFill } from 'react-icons/ri';

const ListStores = () => {
    return (
        <div>
            <div className={'flex items-center text-white border border-white rounded px-2 py-1 gap-2'}>
                <div className={'text-base'}>
                    <GoLocation />
                </div>

                <div className={'flex flex-col'}>
                    <div className={'flex items-center'}>
                        <Typography content={'navbar.list_stores.label'} className={'text-xs mb-0'}/>
                        <RiArrowDownSFill/>
                    </div>
                    <Typography content={'Hà Nội'} className={'text-sm'}/>
                </div>

            </div>
        </div>
    );
};

export default ListStores;
