import React from 'react';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@/components/base/Typography';
import { createUserAddressType } from '@/types/userAddress';
import { FiTrash } from 'react-icons/fi';
import { createSearchParams, useSearchParams } from 'react-router-dom';

type cartUserAddressTypes = {
    addressInfor: createUserAddressType,
    handleOpenModal: () => void
}

const CardUserAddress: React.FC<cartUserAddressTypes> = ({ addressInfor, handleOpenModal }) => {
    const {
        _id,
        userName,
        phoneNumber,
        address,
        district,
        city,
        nation,
        isDefaultAddress,
        isWorkingAddress
    } = addressInfor;

    const [ searchParams, setSearchParams ] = useSearchParams();



    const handleClickUserName = () => {
        if (_id) {
            setSearchParams(createSearchParams({ id: _id }));
            handleOpenModal();
        }
    };

    return (
        <>
            <Card variant={'elevation'}>
                <CardContent>
                    <div className={'flex justify-between items-center'}>
                        <div onClick={() => handleClickUserName()}>
                            <Typography
                                content={userName}
                                className={'text-2xl font-bold cursor-pointer hover:underline'}
                            />
                        </div>

                        <div className={'text-base cursor-pointer'}>
                            <FiTrash />
                        </div>
                    </div>

                    <div className={'mt-3 flex flex-col gap-1'}>
                    <Typography
                        content={phoneNumber}
                        className={'text-gray-400 italic'}
                    />
                    <Typography content={address} />
                    <Typography content={`${district}, ${city}, ${nation}`} />
                    </div>

                    <div className={'mt-3 flex items-center gap-3'}>
                        {isDefaultAddress && (
                            <Typography
                                content={'my_address_page.form.default_address.title'}
                                className={'p-2 rounded border border-gray-400 text-gray-400 w-fit'}
                            />
                        )}
                        <Typography
                            content={`my_address_page.form.address_type.${isWorkingAddress ? 'office' : 'home'}`}
                            className={'p-2 rounded border border-gray-400 text-gray-400 w-fit'}
                        />

                    </div>

                </CardContent>
            </Card>
        </>
    );
};

export default CardUserAddress;
