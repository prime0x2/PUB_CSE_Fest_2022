import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice/themeSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export default store;