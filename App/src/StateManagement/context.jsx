import { createContext, useReducer, useEffect } from "react";
import reducer, { ACTIONS } from "./reducer";
import { fetchData, postData, deleteData, putData } from "../API/Services/ApiServices.js";

export const TodoContext = createContext();

export default function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { posts: [], users: [], comments: []  });

  useEffect(() => {
    const fetchInitialData = async () => {
        try {
          const initialData = await fetchData('./posts')
          const usersData = await fetchData('./users');
          dispatch({ 
            type: ACTIONS.SET_POSTS, 
            payload: initialData });
          dispatch({ 
              type: ACTIONS.SET_USERS, 
              payload: usersData 
            });
        } catch (error) {
          console.error('Error fetching initial data:', error);
        }
      };

    fetchInitialData();
  }, []);

  const addPost = async (postBody, postTitle, userId) => {
    try {
      const res = await postData('./posts', { body: postBody, title: postTitle, userId });
      const newPost = res
      dispatch({
        type: ACTIONS.ADD_POST,
        payload: newPost
      });
      const updatedPosts = await fetchData('./posts');
      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: updatedPosts
      });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };


const deletePost = async (postId) =>  {
    try{
        const res = await deleteData(`./posts/${postId}`)
        dispatch({
            type: ACTIONS.DELETE_POST,
            payload: {
                id: postId
            }
        })
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

const editPost = async (postId, postBody, postTitle) => {
  try {
    const res = await putData(`./posts/${postId}`, { body: postBody, title: postTitle });
    dispatch({
      type: ACTIONS.EDIT_POST,
      payload: {
        body: postBody,
        id: postId,
        title: postTitle,
      },
    });
  } catch (error) {
    console.error('Error editing post:', error);
  }
};

  return (
    <TodoContext.Provider value={{state, addPost, deletePost, editPost}}>
      {children}
    </TodoContext.Provider>
  );
}
