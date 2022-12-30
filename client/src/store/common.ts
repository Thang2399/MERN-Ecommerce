import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
    showPopupConfirm: boolean
}

const initialState: CommonState = {
    showPopupConfirm: false
};

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        setShowPopupConfirm(state, action: PayloadAction<boolean>) {
            state.showPopupConfirm = action.payload;
        }
    },
});

export const { setShowPopupConfirm } = commonSlice.actions;

export default  commonSlice.reducer;