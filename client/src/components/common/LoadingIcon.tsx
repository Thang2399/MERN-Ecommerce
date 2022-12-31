import React from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function LoadingIcon(): JSX.Element {
    const showLoadingIcon = useSelector((state: RootState) => state.commonReducer.showLoadingIcon);

    return (
        <>
            {showLoadingIcon && (
                <div className={'absolute top-0 left-0 z-50'}>
                    <div className={'w-screen h-screen bg-white bg-opacity-90'}>
                        <div className={'w-full h-full flex justify-center items-center'}>
                            <ReactLoading type={'spin'} color={'#374151'} width={'80px'} height={'80px'}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
