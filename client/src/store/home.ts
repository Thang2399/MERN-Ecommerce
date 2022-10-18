// import {REDUCER_HOME_ACTION} from "../constants";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookieData } from '../utils/misc';
import { COMMON_CONSTANTS } from '../constants';
import { setCookie } from 'typescript-cookie';
import i18next from 'i18next';

export interface CommonState {
    currentLanguage: string,
    showQuickView: boolean,
    itemId: string
}

const initialState: CommonState = {
	currentLanguage:
		getCookieData(COMMON_CONSTANTS.I18NEXT) || COMMON_CONSTANTS.VN,
    showQuickView: false,
    itemId: ''
};

export const changeLanguageSlice = createSlice({
	name: 'changeLanguageSlice',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            i18next.changeLanguage(action.payload);
            state.currentLanguage = action.payload;
            setCookie(COMMON_CONSTANTS.I18NEXT, action.payload);
        },
        showQuickView: (state, action: PayloadAction<boolean>)  => {
            state.showQuickView = action.payload;
        },
        getDetailItem: (state, action: PayloadAction<string>) => {
            state.itemId = action.payload;
        }
    }
});

export const { changeLanguage, showQuickView, getDetailItem } =
	changeLanguageSlice.actions;

export default changeLanguageSlice.reducer;