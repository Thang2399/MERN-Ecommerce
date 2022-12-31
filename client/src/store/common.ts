import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'typescript-cookie';
import { COMMON_CONSTANTS } from '../constants';

export interface CommonState {
    showPopupConfirm: boolean,
    showLoadingIcon: boolean,
    showToastMessage: {
        show: boolean,
        message: string,
        type: string,
    },
    userCommonInfor: {
    accessToken: string,
    role: string,
    id: string,
    }
}

const getCommonUserInfor = (name: string) => {
    const result = getCookie(name);
    if (typeof result === 'string') {
        return result;
    } else return '';
};

const initialState: CommonState = {
    showPopupConfirm: false,
    showLoadingIcon: false,
    showToastMessage: {
        show: false,
        message: '',
        type: '',
    },
    userCommonInfor: {
    accessToken: getCommonUserInfor(COMMON_CONSTANTS.ACCESS_TOKEN),
    role: getCommonUserInfor(COMMON_CONSTANTS.USER_ROLE),
    id: getCommonUserInfor(COMMON_CONSTANTS.USER_ID),
    }
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
        }
    },
});

export const {
    setShowPopupConfirm,
    setShowLoadingIcon,
    setShowToastMessage,
    setHideToastMessage,
    setUserCommonInfor
} = commonSlice.actions;

export default commonSlice.reducer;