import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './home';
import cartPageReducer from './cart';

export const store = configureStore({
    reducer: {
        homePageReducer: homePageReducer,
        cartPageReducer: cartPageReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
