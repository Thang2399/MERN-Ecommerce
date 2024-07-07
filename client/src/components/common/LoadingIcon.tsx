import React from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Modal from '@mui/material/Modal';

export default function LoadingIcon(): JSX.Element {
    const showLoadingIcon = useSelector((state: RootState) => state.commonReducer.showLoadingIcon);

    return (
        <>
            {showLoadingIcon && (
                <>
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        data-test={'loadingIcon'}
                    >
                        <>
                            <div className={'flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                                <ReactLoading type={'spin'} color={'#ffffff'} width={'80px'} height={'80px'}/>
                            </div>
                        </>
                    </Modal>
                </>

            )}
        </>
    );
}
