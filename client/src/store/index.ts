import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './common';
import homePageReducer from './home';
import cartPageReducer from './cart';
import invoicePageReducer from './invoice';
import forgetPasswordReducer from './forgetPassword';

export const store = configureStore({
    reducer: {
        commonReducer: commonReducer,
        homePageReducer: homePageReducer,
        cartPageReducer: cartPageReducer,
        invoicePageReducer: invoicePageReducer,
        forgetPasswordReducer: forgetPasswordReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
