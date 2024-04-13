import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: 'boardsSlice',
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

export const { getBoards, addBoard, updateBoard, deleteBoard } = boardsSlice.actions;
export const boardsSliceName = boardsSlice.name;
export default boardsSlice.reducer;
