import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice/studentsSlice';
import themeReducer from './themeSlice/themeSlice';
import userReducer from './userSlice/userSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        students: studentsReducer,
    },
});

export default store;