import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice/themeSlice';
import userReducer from './userSlice/userSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
    },
});

export default store;