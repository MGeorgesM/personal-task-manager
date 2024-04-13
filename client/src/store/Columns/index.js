import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columns: [],
};


const columnSlice = createSlice({
    name: 'columnSlice',
    initialState,
    reducers: {
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        addColumn: (state, action) => {
            state.columns.push(action.payload);
        },
        updateColumn: (state, action) => {
            const { _id, title } = action.payload;
            const columnIndex = state.columns.findIndex((column) => column._id === _id);
            if (columnIndex !== -1) {
                state.columns[columnIndex].title = title || state.columns[columnIndex].title;
            }
        },
        deleteColumn: (state, action) => {
            const columnId = action.payload;
            state.columns = state.columns.filter((column) => column._id !== columnId);
        },
    },
});

export const { setColumns, addColumn, updateColumn, deleteColumn } = columnSlice.actions;
export const columnSliceName = columnSlice.name;
export default columnSlice.reducer;