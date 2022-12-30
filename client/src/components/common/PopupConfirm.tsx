import React from 'react';
import Typography from '../base/Typography';
import Button from '../base/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
    popupTitle: string;
    showPopupTitle?: boolean,
    popupLabel: string;
    cancelButtonLabel: string;
    confirmButtonLabel: string;
    handleCancel: () => any;
    handleConfirm: (param: any) => any;
}

const PopupConfirm: React.FC<Props> = ({
    popupTitle,
    showPopupTitle,
    popupLabel,
    cancelButtonLabel,
    confirmButtonLabel,
    handleCancel,
    handleConfirm
}) => {
    return (
        <div className={'w-screen h-screen bg-black bg-opacity-40'}>
            <div className={'w-full h-full flex justify-center items-center'}>
                <div className={'w-3/5 flex justify-center items-center'}>
                    <div className={''}>
                        <div className={`w-full h-12 ${showPopupTitle ? 'bg-gray-400' : 'bg-white'} rounded-t-lg p-2`}>
                            <div className={'w-full flex justify-between items-center'}>
                                <div className={'w-full flex justify-center items-center'}>
                                    <Typography
                                        content={popupTitle}
                                        className={'text-white text-2xl font-semibold'}
                                    />
                                </div>
                            <div
                            className={`${showPopupTitle ? 'text-white' : 'text-gray-400'} cursor-pointer text-2xl`}
                            onClick={handleCancel}
                            >
                            <AiOutlineCloseCircle/>
                        </div>
                            </div>
                        </div>

                        <div className={'bg-white rounded-b-lg px-3 py-5 w-full h-36'}>
                            <div className={'text-center mt-2'}>
                                <Typography
                                    content={popupLabel}
                                    className={'text-gray-400 text-2xl font-semibold'}
                                />
                            </div>

                            <div className={'mt-6 flex justify-between items-center w-full px-10'}>
                                <div className={'w-1/2 mr-2'}>
                                <Button
                                    handleClick={handleCancel}
                                    content={cancelButtonLabel}
                                    buttonClassName={'bg-white border text-gray-400 hover:bg-gray-400 hover:text-white'}
                                />
                                </div>
                                <div className="w-1/2">
                                <Button
                                    handleClick={handleConfirm}
                                    content={confirmButtonLabel}
                                    buttonClassName={'bg-gray-400 border text-white hover:bg-white hover:text-gray-400'}
                                />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

PopupConfirm.defaultProps = {
  showPopupTitle: true
};

export default PopupConfirm;