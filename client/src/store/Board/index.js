import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
    loading: false,
    error: null,
};

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        updateBoard: (state, action) => {
            const { _id, title, description } = action.payload;
            const boardIndex = state.boards.findIndex((board) => board._id === _id);
            if (boardIndex !== -1) {
                state.boards[boardIndex].title = title || state.boards[boardIndex].title;
                state.boards[boardIndex].description = description || state.boards[boardIndex].description;
            }
        },
        deleteBoard: (state, action) => {
            const boardId = action.payload;
            state.boards = state.boards.filter((board) => board._id !== boardId);
        },
    },
});

export const { getBoards, addBoard, updateBoard, deleteBoard, setLoading, setError } = boardSlice.actions;
export const boardSliceName = boardSlice.name;
export default boardSlice.reducer;
