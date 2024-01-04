import { useEffect, useState } from "react";
import CardComponent from '../Card/card';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync } from "../../Actions/Actions";

export default function List() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  const handleClick = (postId, postBody, postTitle, userId) => {
    localStorage.setItem('post', JSON.stringify(
      {
        id: postId,
        body: postBody,
        title: postTitle,
        userId: userId
      }
    ));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 10 >=
      document.documentElement.offsetHeight
    ){
      setLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPostsAsync());
      setLoading(false);
    };

    if (loading) {
      fetchData();
    }
  }, [loading]);

  if (!blog || (blog.posts.length === 0 && loading)) {
    return <div className='col-12 text-center mt-5 pt-5 loading'>Loading...</div>;
  }

  const endIndex = currentPage * 7;
  const visiblePosts = blog.posts.slice(0, endIndex);

  return (
    <>
      <h1 className='col-10 mx-auto'>Posts</h1>
      <main className="col-10 mx-auto">
        <ul>
          {visiblePosts.map((post) => (
            <Link to={`post/${post.id}`} key={post.id}>
              <li
                className='fadeIn'
                onClick={() => {
                  handlelClick(post.id, post.body, post.title, post.userId);
                }}
                key={post.id}
              >
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
