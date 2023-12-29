import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, postData, deleteData, putData } from '../API/Services/ApiServices';

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
      console.log(res)
      return res
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  })
  export const fetchCommentsAsync = createAsyncThunk('blog/fetchComments', async (postId) => {
    try {
      const res = await fetchData(`./posts/${postId}/comments`);
      return res
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  })
  
  export const addDataAsync = createAsyncThunk('blog/postData', async (postId, postBody, postTitle) => {
    try {
      const res = await postData('./posts', { id: postId, body: postBody, title: postTitle });
      const updatedData = await fetchData('./posts');
      return updatedData
    } catch (error) {
      console.error('Error adding Post:', error);
    }
  })
  
  export const deleteDataAsync = createAsyncThunk('blog/deleteData', async (postId) => {
    try{
      const res = await deleteData(`./posts/${postId}`)
      console.log('API Response:', res)
      return postId
  } catch (error) {
      console.error('Error deleting post:', error);
  }
  });
  
  export const editDataAsync = createAsyncThunk('blog/updateData', async (id, postBody, postTitle) => {
    try {
      const res = await putData(`./posts/${id}`, { body: postBody, title: postTitle });
      console.log('API Response:', res)
      return res
    } catch (error) {
      console.error('Error editing post:', error);
    }
  });