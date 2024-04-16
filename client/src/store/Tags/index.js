import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [],
};

const tagsSlice = createSlice({
    name: 'tagsSlice',
    initialState,
    reducers: {

        setTags: (state, action) => {
            state.tags = action.payload;
        }
    }
})

export const { setTags } = tagsSlice.actions;
export const tagsSliceName = tagsSlice.name;
export default tagsSlice.reducer;