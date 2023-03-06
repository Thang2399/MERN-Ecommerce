import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IForgetPasswordState {
    forgetPasswordEmail: string;
}

const initialState: IForgetPasswordState = {
    forgetPasswordEmail: ''
};

export const forgetPasswordSlice = createSlice({
    name: 'forgetPasswordSlice',
    initialState,
    reducers: {
        setForgetPasswordEmail: (state, action: PayloadAction<string>) => {
            state.forgetPasswordEmail = action.payload;
        }
    }
});

export const { setForgetPasswordEmail } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;