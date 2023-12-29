import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../Features/Blog/BlogReducer';


const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;
