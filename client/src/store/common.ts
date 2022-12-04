import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setCookie } from 'typescript-cookie';
import i18next from 'i18next';
import { getCookieData } from '../utils/misc';
import { COMMON_CONSTANTS } from '../constants';

export interface CommonState {
    currentLanguage: string,
}

const cookieLanguageCode = getCookieData(COMMON_CONSTANTS.I18NEXT);