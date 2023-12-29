import { useEffect } from "react";
import CardComponent from '../Card/card';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsAsync } from "../../Actions/Actions";

export default function List() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchPostsAsync())
  },[])

  const handleLiClick = (postId, postBody, postTitle, userId) => {
    localStorage.setItem('post', JSON.stringify(
      {
        id: postId,
        body: postBody,
        title: postTitle,
        userId: userId
      }
    ));
  };

  if (!blog || blog.posts.length === 0 ) {
    return <div className='col-12 text-center mt-5 pt-5 loading'>Loading...</div>
  }

  return (
    <>
      <h1 className='col-10 mx-auto'>Posts</h1>
      <main className="col-10 mx-auto">
      <ul>
       
          {blog.posts.map(post => (
            <Link to={`post/:${post.id}`}>
            <li onClick={() => { handleLiClick(post.id, post.body, post.title, post.userId)}} key={post.id}>
              <CardComponent 
              title={post.title}
              body={post.body}
              id={post.id}
              className={'mt-3'}
              />
            </li>
            </Link>
          ))}
        </ul>
      </main>
    </>
  );
}
