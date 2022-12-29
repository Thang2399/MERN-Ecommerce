import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultSingleInvoice } from '../form/invoice';
import { singleInvoiceType } from '../types/invoice';

export interface InvoiceState {
    singleInvoice: singleInvoiceType
}

const initialState: InvoiceState = {
    singleInvoice: defaultSingleInvoice
};

export const invoiceSlice = createSlice({
    name: 'invoiceSlice',
    initialState,
    reducers: {
        setInvoice(state, action: PayloadAction<singleInvoiceType>) {
            state.singleInvoice = action.payload;
        }
    },
});

export const { setInvoice } = invoiceSlice.actions;

export default  invoiceSlice.reducer;