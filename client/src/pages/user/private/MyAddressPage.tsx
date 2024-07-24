import React, { useEffect, useState } from 'react';
import CreateEditAddressModal from '@/components/myAddress/myAddressModal/CreateEditMyAddressModal';
import Button from '@/components/base/Button/Button';
import Typography from '@/components/base/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoadingBtn, setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import services from '@/services';
import { RootState } from '@/store';
import { createUserAddressType } from '@/types/userAddress';
import CardUserAddress from '@/components/myAddress/cardUserAddress/CardUserAddress';
import { useSearchParams } from 'react-router-dom';

const MyAddressPage: React.FC = () => {
    const userId = useSelector((state: RootState) => state.commonReducer.userCommonInfor.id);

    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id') || '';
    const [ openModal, setOpenModal ] = useState<boolean>(!!id);
    const [ listAddress, setListAddress ] = useState<createUserAddressType[]>([]);

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    const handleGetListUserAddress = async () => {
        try {
            dispatch(setShowLoadingIcon(true));

            const payload = {
                page: 1,
                limit: 20,
                userId
            };

            const res = await services.getListUserAddressByUserId(payload);
            const data = res.data.data;
            if (res && data.length) {
                setListAddress(data);
            }
        } catch (err) {
            console.log('err', err);
        }
        dispatch(setShowLoadingIcon(false));
    };

    useEffect(() => {
        if (userId) {
            handleGetListUserAddress();
        }
    }, [ userId ]);

    const handleCreateEditUserAddress = async (payload: any, updateId = '') => {
        dispatch(setShowLoadingBtn(true));
        try {
            let res;
            if (updateId) {
                res = await services.updateUserAddress(updateId, payload);
            } else {
                res = await services.createUserAddress(payload);
            }
            if (res) {
                dispatch(setShowToastMessage({
                    show: true,
                    type: 'success',
                    message: `my_address_page.form.response.${updateId ? 'edit' : 'create'}_success`
                }));
                handleCloseModal();
                handleGetListUserAddress();
            }
        } catch (err) {
            console.log('err', err);
            dispatch(setShowToastMessage({
                    show: true,
                    type: 'error',
                    message: `my_address_page.form.response.${updateId ? 'edit' : 'create'}_failed`
                }));
        }
        dispatch(setShowLoadingBtn(false));
    };

    return (
        <div>
            <Typography
                content={'my_address_page.label'}
                variant={'h1'}
                className={'text-4xl text-black font-semibold capitalize mb-10'}
                needTranslate={true}
            />

            <div className={'flex justify-end'}>
                <Button
                    buttonClassName={'w-fit bg-gray-400 text-white'}
                    content={'my_address_page.create_label_button'}
                    handleClick={handleOpenModal} />
            </div>

            <div className={'my-4'}>
                {listAddress.length > 0
                    ? (
                        <div className={'grid grid-cols-2 grid-flow-row gap-4'}>
                            {listAddress.map((address: createUserAddressType) => (
                                <React.Fragment key={address._id}>
                                    <CardUserAddress
                                        addressInfor={address}
                                        handleOpenModal={handleOpenModal}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    )
                    : (
                        <div>No Address</div>
                    )
                }
            </div>


            {openModal && (
                <CreateEditAddressModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    handleSubmit={handleCreateEditUserAddress}
                />
            )}
        </div>
    );
};

export default MyAddressPage;
