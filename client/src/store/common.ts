import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../constants';

interface CommonState {
    showPopupConfirm: boolean,
    showLoadingIcon: boolean,
    showToastMessage: {
        show: boolean,
        message: string,
        type: string,
    },
    userCommonInfor: {
        role: string,
        id: string,
        email: string,
        userName: string
    },
    showLoadingBtn: boolean,
}

const initialState: CommonState = {
    showPopupConfirm: false,
    showLoadingIcon: false,
    showToastMessage: {
        show: false,
        message: '',
        type: '',
    },
    userCommonInfor: {
        role: '',
        id: '',
        email: '',
        userName: ''
    },
    showLoadingBtn: false
};

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        setShowPopupConfirm(state, action: PayloadAction<boolean>) {
            state.showPopupConfirm = action.payload;
        },
        setShowLoadingIcon(state, action: PayloadAction<boolean>) {
            state.showLoadingIcon = action.payload;
        },
        setShowToastMessage(state, action: PayloadAction<CommonState['showToastMessage']>) {
            state.showToastMessage = action.payload;
        },
        setHideToastMessage(state) {
            state.showToastMessage = {
                show: false,
                message: '',
                type: '',
            };
        },
        setUserCommonInfor(state, action: PayloadAction<CommonState['userCommonInfor']>) {
            state.userCommonInfor = action.payload;
        },
        setShowLoadingBtn(state, action: PayloadAction<boolean>) {
            state.showLoadingBtn = action.payload;
        }
    },
});

export const {
    setShowPopupConfirm,
    setShowLoadingIcon,
    setShowToastMessage,
    setHideToastMessage,
    setUserCommonInfor,
    setShowLoadingBtn
} = commonSlice.actions;

export default commonSlice.reducer;
