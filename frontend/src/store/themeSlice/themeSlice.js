import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: localStorage.getItem('theme') || 'light',
};


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.value);
        },
    }
});


export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;