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
  const postsPerPage = 10; // Adjust as needed

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blog.posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(blog.posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!blog || (blog.posts.length === 0)) {
    return <div className='col-12 text-center mt-5 pt-5 loading'>Loading...</div>;
  }

  return (
    <>
      <h1 className='col-10 mx-auto'>Posts</h1>
      <main className="col-10 mx-auto">
        <ul>
          {currentPosts.map((post) => (
            <Link to={`post/${post.id}`} key={post.id}>
              <li
                onClick={() => {
                  handleClick(post.id, post.body, post.title, post.userId);
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
      <div className="mx-auto my-4 col-4 d-flex justify-content-around">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: Math.ceil(blog.posts.length / postsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === Math.ceil(blog.posts.length / postsPerPage)}>
          Next
        </button>
      </div>
    </>
  );
}
