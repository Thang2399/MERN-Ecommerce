import React from 'react';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@/components/base/Typography';
import { createUserAddressType } from '@/types/userAddress';

type cartAddressTypes = {
    address: createUserAddressType
}

const CardAddress: React.FC<cartAddressTypes> = ({ address }) => {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent></CardContent>

    </Card>
        </>
    );
};

export default CardAddress;
