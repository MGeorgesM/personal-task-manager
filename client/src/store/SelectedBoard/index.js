import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedBoard: null,
    columns: [],
};

const selectedBoardSlice = createSlice({
    name: 'selectedBoardSlice',
    initialState,
    reducers: {

        setSelectedBoard: (state, action) => {
            state.selectedBoard = action.payload;
        },

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

        addTask: (state, action) => {
            const { columnId, task } = action.payload;
            const columnIndex = state.columns.findIndex((column) => column._id === columnId);
            if (columnIndex !== -1) {
                state.columns[columnIndex].tasks.push(task);
            }
        },

        updateTask: (state, action) => {
            const { columnId, task } = action.payload;
            const columnIndex = state.columns.findIndex((column) => column._id === columnId);
            if (columnIndex !== -1) {
                const taskIndex = state.columns[columnIndex].tasks.findIndex((t) => t._id === task._id);
                if (taskIndex !== -1) {
                    state.columns[columnIndex].tasks[taskIndex] = task;
                }
            }
        },

        deleteTask: (state, action) => {
            const { columnId, taskId } = action.payload;
            const columnIndex = state.columns.findIndex((column) => column._id === columnId);
            if (columnIndex !== -1) {
                state.columns[columnIndex].tasks = state.columns[columnIndex].tasks.filter((task) => task._id !== taskId);
            }
        },
    },
});

export const { setSelectedBoard, setColumns, addColumn, updateColumn, deleteColumn, addTask, updateTask, deleteTask } = selectedBoardSlice.actions;
export const selectedBoardSliceName = selectedBoardSlice.name;
export default selectedBoardSlice.reducer;