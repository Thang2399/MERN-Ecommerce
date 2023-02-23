import React, { useEffect } from 'react';
import { detailSingleInvoiceType } from '../../types/invoice';
import Typography from '../base/Typography';
import { INVOICE_STATUS } from '../../constants/invoice';

type Props = {
    invoiceItem: detailSingleInvoiceType
}

const invoiceStatuses = [
    {
        status: INVOICE_STATUS.RECEIVED_ORDER,
        value: 'invoices_history_page.single_invoice.invoice_status.received_order'
    },
    {
        status: INVOICE_STATUS.CHECKING_IN_STOCK,
        value: 'invoices_history_page.single_invoice.invoice_status.checking_in_stock'
    },
    {
        status: INVOICE_STATUS.PREPARING_ITEMS,
        value: 'invoices_history_page.single_invoice.invoice_status.preparing_items'
    },
    {
        status: INVOICE_STATUS.PACKAGED_ITEMS,
        value: 'invoices_history_page.single_invoice.invoice_status.package_items'
    },
    {
        status: INVOICE_STATUS.DELIVERING,
        value: 'invoices_history_page.single_invoice.invoice_status.delivering'
    },
    {
        status: INVOICE_STATUS.DELIVERED_SUCCESS,
        value: 'invoices_history_page.single_invoice.invoice_status.delivered_success'
    },
    {
        status: INVOICE_STATUS.DELIVERED_FAILED,
        value: 'invoices_history_page.single_invoice.invoice_status.delivered_success'
    },
];

const SingleInvoiceItem: React.FC<Props> = ({ invoiceItem }) => {
        const fullName = `${invoiceItem.firstName} ${invoiceItem.lastName}`;
        const address = `${invoiceItem.streetAddress}, ${invoiceItem.district} ${invoiceItem.city}, ${invoiceItem.country}`;

        const convertPaymentMethod = (isCodMethod: boolean) => {
            let result = '';
            if (isCodMethod) {
                result = 'invoices_history_page.single_invoice.payment_method.method.ship_cod';
            } else result = 'invoices_history_page.single_invoice.payment_method.method.card';
            return result;
        };
        const convertShippingMethod = (isShipToHome: boolean) => {
            let result = '';
            if (isShipToHome) {
                result = 'invoices_history_page.single_invoice.shipping_method.method.home';
            } else result = 'invoices_history_page.single_invoice.shipping_method.method.store';
            return result;
        };

        const convertInvoiceStatus = (status: string) => {
            const specificInvoiceStatus =  invoiceStatuses.find((item: {status: string, value: string}) => item.status === status);

            return specificInvoiceStatus?.value || invoiceStatuses[0].value;
        };


        return (
            <div>
                <div className={'flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.invoice_label'}
                        className={'mr-2 text-2xl font-semibold'}
                    />
                    <Typography
                        content={invoiceItem.invoiceId}
                        className={'text-2xl font-semibold'}
                        needTranslate={false}
                    />
                </div>

                <div className={'mt-2 flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.invoice_status.label'}
                        className={'text-gray-400 text-base mr-2'}
                    />
                    <Typography
                        content={convertInvoiceStatus(invoiceItem.invoiceStatus)}
                        className={'text-base'}
                    />
                </div>

                <div className={'mt-2'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'flex'}>
                            <Typography
                                content={'invoices_history_page.single_invoice.full_name'}
                                className={'text-gray-400 text-base mr-2'}
                            />
                            <Typography
                                content={fullName}
                                className={'text-base'}
                                needTranslate={false}
                            />
                        </div>

                        <div className={'flex'}>
                            <Typography
                                content={'invoices_history_page.single_invoice.email'}
                                className={'text-gray-400 text-base mr-2'}
                            />
                            <Typography
                                content={invoiceItem.emailAddress}
                                className={'text-base'}
                                needTranslate={false}
                            />
                        </div>

                        <div className={'flex'}>
                            <Typography
                                content={'invoices_history_page.single_invoice.phone_number'}
                                className={'text-gray-400 text-base mr-2'}
                            />
                            <Typography
                                content={invoiceItem.phoneNumber}
                                className={'text-base'}
                                needTranslate={false}
                            />
                        </div>
                    </div>

                </div>

                <div className={'mt-2 flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.address'}
                        className={'text-gray-400 text-base mr-2'}
                    />
                    <Typography
                        content={address}
                        className={'text-base'}
                        needTranslate={false}
                    />
                </div>

                <div className={'mt-2 flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.payment_method.label'}
                        className={'text-gray-400 text-base mr-2'}
                    />
                    <Typography
                        content={convertPaymentMethod(invoiceItem.isCodMethod)}
                        className={'text-base'}
                    />
                </div>

                <div className={'mt-2 flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.shipping_method.label'}
                        className={'text-gray-400 text-base mr-2'}
                    />
                    <Typography
                        content={convertShippingMethod(invoiceItem.isShipToHome)}
                        className={'text-base'}
                    />
                </div>

                <div className={'mt-2 flex'}>
                    <Typography
                        content={'invoices_history_page.single_invoice.list_bought_items.label'}
                        className={'text-gray-400 text-base mr-2'}
                    />
                    <Typography
                        content={convertShippingMethod(invoiceItem.isShipToHome)}
                        className={'text-base'}
                    />
                </div>
            </div>
        );
    }
;

export default SingleInvoiceItem;