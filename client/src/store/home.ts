// import {REDUCER_HOME_ACTION} from "../constants";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookieData } from '../utils/misc';
import { COMMON_CONSTANTS } from '../constants';
import { setCookie } from 'typescript-cookie';
import i18next from 'i18next';

export interface CommonState {
    currentLanguage: string
}

const initialState: CommonState = {
	currentLanguage: getCookieData(COMMON_CONSTANTS.I18NEXT) || COMMON_CONSTANTS.VN,
};

export const changeLanguageSlice = createSlice({
	name: 'changeLanguageSlice',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            console.log(state, action.payload);
            i18next.changeLanguage(action.payload);
            state.currentLanguage = action.payload;
            setCookie(COMMON_CONSTANTS.I18NEXT, action.payload);
        }
    }
});

export const { changeLanguage } = changeLanguageSlice.actions;

export default changeLanguageSlice.reducer;