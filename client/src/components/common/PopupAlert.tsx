import React from 'react';
import Typography from '../base/Typography';
import Button from '../base/Button';

interface IPopupAlert {
    popupTitle: string;
    popupLabel: string;
    confirmButtonLabel: string;
    handleConfirm: (params: any) => void;
}

const PopupAlert: React.FC<IPopupAlert> = ({
    popupTitle,
    popupLabel,
    confirmButtonLabel,
    handleConfirm
}) => {
    return (
        <div className={'w-screen h-screen bg-black bg-opacity-40'}>
            <div className={'w-full h-full flex justify-center items-center'}>
                <div className={'w-3/5 flex justify-center items-center'}>
                    <div>
                        <div className={'w-full h-12 bg-gray-400 rounded-t-lg p-2'}>
                            <div className={'w-full flex justify-between items-center'}>
                                <div className={'w-full flex justify-center items-center'}>
                                    <Typography
                                        content={popupTitle}
                                        className={'text-white text-2xl font-semibold'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'bg-white rounded-b-lg px-3 py-5 w-full h-1/3'}>
                            <div className={'text-center mt-2 whitespace-pre-line flex justify-center items-center'}>
                                <div className={'w-full flex justify-center items-center'}>
                                    <div className={'w-2/3'}>
                                        <Typography
                                            content={popupLabel}
                                            className={'text-gray-400 text-2xl font-semibold'}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={'mt-6 flex justify-center items-center w-full px-10'}>
                                <div className="w-2/3">
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

export default PopupAlert;
