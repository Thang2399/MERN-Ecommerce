import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userInforFormType } from '../types/cart';
import { userInforForm } from '../form/cart';

export interface CartPageState {
    userInforForm: userInforFormType;
}

const initialState: CartPageState = {
    userInforForm: userInforForm
};

export const cartPageSlice = createSlice({
    name: 'cartPageSlice',
    initialState,
    reducers: {
        setUserInforFormData: (state, action: PayloadAction<userInforFormType>) => {
            state.userInforForm = action.payload;
        }
    }
});

export const { setUserInforFormData } = cartPageSlice.actions;

export default cartPageSlice.reducer;
