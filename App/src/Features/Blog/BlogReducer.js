import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsAsync, fetchCommentsAsync, fetchUsersAsync, deleteDataAsync, editDataAsync, addDataAsync} from '../../Actions/Actions'
const initialState = {
  posts: [],
  users: [],
  comments: []
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload
      })
      .addCase(addDataAsync.fulfilled, (state, action) => {
        const newPost = action.payload
        state.posts = [...state.posts, newPost];
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
        post.id === action.payload && { ...post, body: action.payload.body, title: action.payload.title } 
      );
      })
  },
});


export default blogSlice.reducer;
