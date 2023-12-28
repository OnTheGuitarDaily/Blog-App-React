import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, postData, deleteData, putData } from '../../API/Services/ApiServices';

const initialState = {
  posts: [],
  users: [],
  comments: []
};

export const fetchPostsAsync = createAsyncThunk('blog/fetchPosts', async () => {
  try {
    const res = await fetchData('./posts');
    return res
  } catch (error) {
    console.error('Error fetching Post:', error)
  }
});
export const fetchUsersAsync = createAsyncThunk('blog/fetchUsers', async () => {
  try {
    const res = await fetchData('./users');
    return res;
  } catch (error) {
    console.error('Error fetching Users:', error);
  }
})
export const fetchCommentsAsync = createAsyncThunk('blog/fetchComments', async (postId) => {
  try {
    const res = await fetchData(`./posts/${postId}/comments`);
    return res.data;
  } catch (error) {
    console.error('Error fetching Users:', error);
  }
})

export const addDataAsync = createAsyncThunk('blog/postData', async (postBody, postTitle, userId) => {
  try {
    const res = await postData('./posts', { body: postBody, title: postTitle, userId });
    const newPost = res
    const updatedPosts = await fetchData('./posts');
  } catch (error) {
    console.error('Error adding Post:', error);
  }
})

export const deleteDataAsync = createAsyncThunk('blog/deleteData', async (postId) => {
  try{
    const res = await deleteData(`./posts/${postId}`)
} catch (error) {
    console.error('Error deleting post:', error);
}
});

export const updateDataAsync = createAsyncThunk('blog/updateData', async (postId, postBody, postTitle) => {
  try {
    const res = await putData(`./posts/${postId}`, { body: postBody, title: postTitle });
  } catch (error) {
    console.error('Error editing post:', error);
  }
});

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
        state.posts.push(action.payload);
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(updateDataAsync.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? { ...post, body: action.payload.body } : post
      );
      })
  },
});


export default blogSlice.reducer;
