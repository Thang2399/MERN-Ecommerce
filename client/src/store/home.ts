import { REDUCER_HOME_ACTION } from '../constants/reducer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookieData } from '../utils/misc';
import { COMMON_CONSTANTS } from '../constants';
import { setCookie } from 'typescript-cookie';
import i18next from 'i18next';
import { singleItemTypes } from '../types';

export interface CommonState {
    currentLanguage: string,
    showQuickView: boolean,
    itemId: string,
    cartItemsList: singleItemTypes[],
    showCart: boolean,
    quantityInCart: string,
    totalPriceInCart: string,
    currency: string
}

const cookieLanguageCode = getCookieData(COMMON_CONSTANTS.I18NEXT);

const localStorageCartList = localStorage.getItem('cartItemsList');
const initialCartList = localStorageCartList ? JSON.parse(localStorageCartList) : [];

const getQuantityItemInCart = () => {
    let count = 0;
    if (initialCartList.length > 0) {
        initialCartList.forEach((item: singleItemTypes) => {
            count = count + item.quantity;
        });
    }

    return count.toString();
};

const initialState: CommonState = {
    currentLanguage:
        cookieLanguageCode || COMMON_CONSTANTS.VN,
    showQuickView: false,
    itemId: '',
    cartItemsList: initialCartList,
    showCart: false,
    quantityInCart: getQuantityItemInCart(),
    totalPriceInCart: '',
    currency: cookieLanguageCode === COMMON_CONSTANTS.VN ? 'đ' : '$'
};

export const changeLanguageSlice = createSlice({
    name: 'changeLanguageSlice',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            i18next.changeLanguage(action.payload);
            state.currentLanguage = action.payload;
            setCookie(COMMON_CONSTANTS.I18NEXT, action.payload);
            state.currency = state.currentLanguage === COMMON_CONSTANTS.VN ? 'đ' : '$';
        },
        showQuickView: (state, action: PayloadAction<boolean>) => {
            state.showQuickView = action.payload;
        },
        getDetailItem: (state, action: PayloadAction<string>) => {
            state.itemId = action.payload;
        },
        showCart: (state, action: PayloadAction<boolean>) => {
            state.showCart = action.payload;
        },
        addItemToCart: (state, action) => {
            const item = action.payload;
            const itemInCart = state.cartItemsList.find((itemInCart: singleItemTypes) => itemInCart._id === item._id);
            if (itemInCart) {
                //  add an existing item to cart
                state.cartItemsList.forEach((item: singleItemTypes) => {
                    if (item._id === itemInCart._id) {
                        item.quantity = item.quantity + 1;
                    }
                });
            } else {
                // add new items into cart
                state.cartItemsList = [ ...state.cartItemsList, item ];
            }
            //  JSON.stringify convert Javascript object to JSON string value
            localStorage.setItem('cartItemsList', JSON.stringify(state.cartItemsList));
        },
        removeItemFromCart: ((state, action: PayloadAction<string>) => {
            const tempCart = state.cartItemsList.filter((item: singleItemTypes) => item._id !== action.payload);
            state.cartItemsList = tempCart;
            localStorage.setItem('cartItemsList', JSON.stringify(state.cartItemsList));
        }),
        changeQuantityItem: (state, action: PayloadAction<{ id: string, type: string }>) => {
            const tempCart = state.cartItemsList.map((item: singleItemTypes) => {
                if (item._id === action.payload.id) {
                    if (action.payload.type === REDUCER_HOME_ACTION.INCREASE) {
                        item.quantity ++;
                    } else if (action.payload.type === REDUCER_HOME_ACTION.DECREASE) {
                        item.quantity --;
                    }
                }
                return item;
            }).filter((item: singleItemTypes) => item.quantity !== 0);
            state.cartItemsList = tempCart;
            localStorage.setItem('cartItemsList', JSON.stringify(state.cartItemsList));
        },
        getTotalCartPrice: (state) => {
            const initialValue = {
                quantity: 0,
                totalPrice: 0
            };
            const { quantity, totalPrice } = state.cartItemsList.reduce((prevItem, currItem) => {
                const { quantity, price } = currItem;
                const singleItemPrice = parseFloat(price);
                const itemPrice = quantity * singleItemPrice;

                prevItem.quantity += quantity;
                prevItem.totalPrice += itemPrice;

                return prevItem;
            }, initialValue);

            state.quantityInCart = quantity.toString();
            state.totalPriceInCart = totalPrice.toString();
        },
        deleteCart: (state) => {
            state.cartItemsList = [];
            localStorage.setItem('cartItemsList', JSON.stringify(state.cartItemsList));
        }
    },
});

export const {
    changeLanguage,
    showQuickView,
    getDetailItem,
    addItemToCart,
    showCart,
    removeItemFromCart,
    changeQuantityItem,
    getTotalCartPrice,
    deleteCart
} = changeLanguageSlice.actions;

export default changeLanguageSlice.reducer;