import { createSlice } from '@reduxjs/toolkit';

const groupPostsSlice = createSlice({
    name: 'groupPosts',
    initialState: {
        data: [],
        loading: true,
        error: null,
    },
    reducers: {
        setGroupPosts: (state, action) => {
            state.data = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setGroupPosts, setLoading, setError } = groupPostsSlice.actions;

export default groupPostsSlice.reducer;