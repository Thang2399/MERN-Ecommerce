import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import services from '../../../services';
import { detailSingleInvoiceType } from '@/types/invoice';
import { setShowLoadingIcon } from '@/store/common';
import { HTTP_STATUS } from '@/constants';

import Typography from '../../../components/base/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/base/Button';
import BaseTable from '@/components/base/BaseTable';
import { formatDateTime } from '@/utils/misc';
import { DATE_TIME_FORMAT } from '@/constants/datetime';
import { USER_ROUTES } from '@/routes/constants';
import BasePagination from '@/components/base/Pagination';
import { convertInvoiceStatus, convertPaymentMethod, convertPaymentStatus, convertShippingMethod } from '@/utils/invoice';
import { paginationDataType } from '@/types';

export default function InvoiceHistoryPage(): JSX.Element {

    const userEmail = useSelector((state: RootState) => state.commonReducer.userCommonInfor.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ listInvoices, setListInvoices ] = useState<detailSingleInvoiceType[]>([]);

    const [ paginationData, setPaginationData ] = useState<paginationDataType>({ currentPage: 1, pageSize: 10, total: 0 });

    const columns = [
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.invoice_label'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'invoiceId',
            key: 'invoiceId',
            render: (invoiceId: string, _: detailSingleInvoiceType,) => {
                return (
                    <div className={'cursor-pointer underline'} onClick={() => navigate(`${USER_ROUTES.INVOICE_HISTORY}/${_.id}`)}>
                        <Typography content={invoiceId} className={'text-base'} />
                    </div>
                );
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.customer_name'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.total_price'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice: string) => (
                <Typography
                    content={`$${totalPrice}`}
                    className={'text-base'}
                />
            )
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.payment_method.label'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (paymentMethod: string) => {
                return (
                    <Typography
                        content={`invoices_history_page.single_invoice.payment_method.method.${convertPaymentMethod(paymentMethod)}`}
                        needTranslate={true}
                        className={'text-base'}
                    />
                );
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.shipping_method.label'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'shippingMethod',
            key: 'shippingMethod',
            render: (shippingMethod: string) => {
                return (
                    <Typography
                        content={`invoices_history_page.single_invoice.shipping_method.method.${convertShippingMethod(shippingMethod)}`}
                        needTranslate={true}
                        className={'text-base'}
                    />
                );
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.invoice_status.label'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'invoiceStatus',
            key: 'invoiceStatus',
            render: (invoiceStatus: string) => {
                return <Typography content={`invoices_history_page.single_invoice.invoice_status.${convertInvoiceStatus(invoiceStatus)}`} className={'text-base'}/>;
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.list_bought_items.number_of_purchased_item'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'listPurchaseItems',
            key: 'listPurchaseItems',
            align: 'center'
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.payment_status.label'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (paymentStatus: string) => {
                return <Typography content={`invoices_history_page.single_invoice.payment_status.${convertPaymentStatus(paymentStatus)}`} className={'text-base'}/>;
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.created_at'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => {
                const convertCreatedAt = formatDateTime(createdAt, DATE_TIME_FORMAT.MM_DD_YYYY_HH_MM);
                return <Typography content={convertCreatedAt} className={'text-base'} />;
            }
        },
        {
            title: (
                <Typography
                    content={'invoices_history_page.single_invoice.updated_at'}
                    className={'capitalize text-base'}
                    needTranslate={true}
                />
            ),
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt: string) => {
                const convertUpdatedAt = formatDateTime(updatedAt, DATE_TIME_FORMAT.MM_DD_YYYY_HH_MM);
                return <Typography content={convertUpdatedAt} className={'text-base'} />;
            }
        },
    ];

    const getListInvoicesFromEmail = async () => {
        try {
            dispatch(setShowLoadingIcon(true));
            const payload = {
                page: paginationData.currentPage,
                limit: paginationData.pageSize,
                email: userEmail
            };

            const res = await services.getListInvoices(payload);

            if (res && res.status === HTTP_STATUS.SUCCESS) {
                const data = res.data;
                const convertedData = data.data.map((item: any) => {
                    return {
                        id: item._id,
                        invoiceId: item.invoiceId,
                        customerName: item.userName,
                        paymentMethod: item.paymentMethod,
                        shippingMethod: item.shippingMethod,
                        totalPrice: item.totalPrice,
                        invoiceStatus: item.invoiceStatus,
                        paymentStatus: item.paymentStatus,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        listPurchaseItems: item.listPurchaseItems.length
                    };
                });
                setListInvoices(convertedData);
                console.log('check run 2');
                setPaginationData((prev: paginationDataType) => ({
                    ...prev,
                    total: data.totalCount
                }));
                dispatch(setShowLoadingIcon(false));
            }

        } catch (err: any) {
            console.log(err);
            dispatch(setShowLoadingIcon(false));
        }
    };

    useEffect(() => {
        console.log('check run 1');
        getListInvoicesFromEmail();
    }, [ userEmail, paginationData.currentPage, paginationData.pageSize ]);

    const navigateToHomePage = () => {
        navigate('/');
    };

    const handleChangePage = (page: number, pageSize: number)  => {
        setPaginationData((prev: paginationDataType) => ({
            ...prev,
            currentPage: page,
            pageSize
        }));
    };

    return (
        <div>
            <Typography
                content={'invoices_history_page.label'}
                variant={'h1'}
                className={'text-3xl font-semibold'}
                needTranslate={true}
            />

            <div className={'mt-10 w-full'}>
                {listInvoices.length > 0
                    ? (
                        <div>
                            <BaseTable columns={columns} data={listInvoices}/>

                            <div className={'my-4 pb-4'}>
                                <BasePagination
                                    pageSize={paginationData.pageSize}
                                    currentPage={paginationData.currentPage}
                                    handleChangePage={handleChangePage}
                                    total={paginationData.total} />
                            </div>
                        </div>
                    )
                    :  (
                        <div className={'border p-5 rounded-md mt-5'}>
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
                        </div>
                    )
                }
            </div>
        </div>
    );
}
