import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowLoadingIcon, setShowToastMessage } from '@/store/common';
import services from '@/services';

const DetailInvoiceHistoryPage: React.FC = () => {
    const dispatch = useDispatch();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const paymentStatus = searchParams.get('payment');
    const { id } = useParams();

    useEffect(() => {
        if (paymentStatus) {
            dispatch(setShowToastMessage({
                type: paymentStatus === 'success' ? 'success' : 'error',
                show: true,
                message: `detail_invoice_history_page.payment.${paymentStatus === 'success' ? 'success': 'error'}`
            }));
            searchParams.delete('payment');
            setSearchParams(searchParams);
        }
    }, [ paymentStatus ]);

    const handleGetDetailInvoice = async () => {
        if (id) {
            try {
                dispatch(setShowLoadingIcon(true));
                const res = await services.getDetailInvoice(id);
                console.log('res', res);
            } catch (err) {
                console.log('err', err);
            }
            dispatch(setShowLoadingIcon(false));
        }

    };

    useEffect(() => {
        if (id) {
            handleGetDetailInvoice();
        }
    }, [ id ]);


    return (
        <>
            DetailInvoiceHistoryPage
        </>
    );
};


export default DetailInvoiceHistoryPage;
