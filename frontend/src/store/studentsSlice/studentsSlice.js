import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    students: [],
    pendingPayments: [],
};


const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        setPendingPayments: (state, action) => {
            state.pendingPayments = action.payload;
        }
    }
});


export const { setStudents, setPendingPayments } = studentsSlice.actions;

export default studentsSlice.reducer;