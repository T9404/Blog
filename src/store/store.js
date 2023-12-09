import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsSlice';
import groupPostsReducer from './reducers/groupPostsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        groupPosts: groupPostsReducer
    },
});