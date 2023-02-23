import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import services from '../../services';
import { detailSingleInvoiceType } from '../../types/invoice';
import { setShowLoadingIcon } from '../../store/common';
import { HTTP_STATUS } from '../../constants';

import Typography from '../../components/base/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import SingleInvoiceItem from '../../components/invoiceHistory/SingleInvoiceItem';

export default function InvoiceHistoryPage(): JSX.Element {
    const userEmail = useSelector((state: RootState) => state.commonReducer.userCommonInfor.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ listInvoices, setListInvoices ] = useState<detailSingleInvoiceType[]>([]);

    const getListInvoicesFromEmail = async () => {
        try {
            dispatch(setShowLoadingIcon(true));
            const payload = {
                email: userEmail
            };

            const res = await services.getListInvoices(payload);
            console.log('res', res);

            if (res && res.status === HTTP_STATUS.SUCCESS) {
                const data = res.data;
                console.log('data, data', data);
                // const convertedData = data.map((item: any) => {
                //
                // })
                setListInvoices(data);
                dispatch(setShowLoadingIcon(false));
            }

        } catch (err: any) {
            console.log(err);
            dispatch(setShowLoadingIcon(false));
        }
    };

    useEffect(() => {
        getListInvoicesFromEmail();
    }, []);

    const navigateToHomePage = () => {
        navigate('/');
    };

    return (
        <div>
            <Typography
                content={'invoices_history_page.label'}
                variant={'h1'}
                className={'text-3xl font-semibold'}
            />

            <div className={'w-full border p-5 rounded-md mt-5'}>
                {listInvoices.length > 0
                    ? (
                        <div>
                            {listInvoices.map((item: detailSingleInvoiceType) => {
                                return (
                                    <div key={item._id} className={'mb-3 last:mb-0'}>
                                        <SingleInvoiceItem invoiceItem={item}/>
                                    </div>
                                );
                            })}
                        </div>
                    )
                    :  (
                        <div className={'p-6 flex flex-col items-center justify-center'}>
                            <div className={'flex justify-center flex-col items-center'}>
                                <Typography
                                    content={'invoices_history_page.empty_value.have_no_invoice'}
                                    className={'text-2xl font-light mb-4'}
                                />
                                <Typography
                                    content={'invoices_history_page.empty_value.return_to_purchase_and_comeback_later'}
                                    className={'text-2xl font-light'}
                                />
                            </div>
                            <div className={'w-1/3 mt-8'}>
                                <Button
                                    handleClick={navigateToHomePage}
                                    content={'invoices_history_page.empty_value.purchase_now'}
                                    typoClassName={'text-white'}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
