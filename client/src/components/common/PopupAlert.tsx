import React from 'react';
import Typography from '../base/Typography';
import Button from '../base/Button';
import { Box, Modal } from '@mui/material';
import { modalStyle } from '@/constants/modal';

interface IPopupAlert {
    openModal: boolean,
    popupTitle: string;
    popupLabel: string;
    confirmButtonLabel: string;
    handleConfirm: (params: any) => void;
    dataTestBtn?: string
}

const PopupAlert: React.FC<IPopupAlert> = ({ openModal, popupTitle, popupLabel, confirmButtonLabel, handleConfirm, dataTestBtn }) => {
    return (
        <>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...modalStyle, p: 0 }}>
                    <div className={'w-full bg-gray-700 rounded-t-lg px-2 py-3'}>
                        <div className={'w-full flex justify-center items-center'}>
                            <Typography
                                content={popupTitle}
                                className={'text-white text-2xl font-semibold'}
                            />
                        </div>
                    </div>

                    <div className={'p-4'}>
                        <div className={'text-center mt-2 whitespace-pre-line flex justify-center items-center'}>
                            <div className={'w-full flex justify-center items-center'}>
                                <div className={'w-2/3'}>
                                    <Typography
                                        content={popupLabel}
                                        className={'text-gray-400 text-xl font-semibold'}
                                    />
                                </div>
                            </div>
                        </div>


                        <Button
                            handleClick={handleConfirm}
                            content={confirmButtonLabel}
                            buttonClassName={'bg-gray-700 border text-white hover:bg-white hover:text-gray-700 mt-3'}
                            dataTest={dataTestBtn}
                        />
                    </div>

                </Box>
            </Modal>

        </>
    );
};

PopupAlert.defaultProps = {
    dataTestBtn: 'okBtn'
};

export default PopupAlert;
