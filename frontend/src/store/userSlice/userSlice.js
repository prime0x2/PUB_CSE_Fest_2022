import jwt_decode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: null,
    token: localStorage.getItem('token') || null
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.info = jwt_decode(action.payload);
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.info = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        isLoggedIn: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.token = token;
                state.info = jwt_decode(token);
            } else {
                state.info = null;
                state.token = null;
            }
        },
        isExpired: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    state.info = null;
                    state.token = null;
                    localStorage.removeItem('token');
                }
            }
        }
    }
});


export const { login, logout, isLoggedIn, isExpired } = userSlice.actions;

export default userSlice.reducer;