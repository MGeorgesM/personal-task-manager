import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer, { userSliceName } from './User';
import boardsSliceReducer, { boardsSliceName } from './Boards';
import selectedBoardSliceReducer, { selectedBoardSliceName } from './SelectedBoard'; 
import tagsSliceReducer, { tagsSliceName } from './Tags';

export const store = configureStore({
    reducer: {
        [userSliceName]: userSliceReducer,
        [boardsSliceName]: boardsSliceReducer,
        [selectedBoardSliceName]: selectedBoardSliceReducer,
        [tagsSliceName]: tagsSliceReducer,
    }
});